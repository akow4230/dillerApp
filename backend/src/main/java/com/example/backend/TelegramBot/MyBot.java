package com.example.backend.TelegramBot;

import com.example.backend.Entity.*;
import com.example.backend.Enums.BotCallBackData;
import com.example.backend.Enums.BotState;
import com.example.backend.Repository.ClientRepo;
import com.example.backend.Repository.CustomerCategoryRepo;
import com.example.backend.Repository.TelegramUserRepo;
import com.example.backend.Repository.TerritoryRepo;
import jakarta.annotation.PostConstruct;
import lombok.SneakyThrows;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.api.methods.ParseMode;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.methods.updatingmessages.DeleteMessage;
import org.telegram.telegrambots.meta.api.objects.CallbackQuery;
import org.telegram.telegrambots.meta.api.objects.Location;
import org.telegram.telegrambots.meta.api.objects.Message;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.InlineKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.ReplyKeyboard;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.ReplyKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.InlineKeyboardButton;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardButton;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardRow;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Component
public class MyBot extends TelegramLongPollingBot {
    private TelegramUser telegramUser;
    private static final Logger logger = LoggerFactory.getLogger(MyBot.class);
    private final ClientRepo clientRepo;
    private final CustomerCategoryRepo customerCategoryRepo;
    private final TelegramUserRepo telegramUserRepo;
    private final TerritoryRepo territoryRepo;

    @SneakyThrows
    @Override
    public void onUpdateReceived(Update update) {
        if (update.hasMessage()) {
            Message message = update.getMessage();
            Long chatId = message.getChatId();
            telegramUser = getUserByChatId(chatId);
            if (message.hasText()) {
                if (message.getText().equalsIgnoreCase("/start")) {
                    botMainMenu(chatId, message.getFrom().getFirstName());
                } else if (message.getText().equals("Yangi Mijoz qo’shish") && telegramUser.getState().equals(BotState.SELECT_MENU)) {
                    PageRequest pageRequest = PageRequest.of(telegramUser.getCurrentPage(), 10);
                    sendSelectCustomCategoryMenu(chatId, pageRequest);
                } else if (telegramUser.getState().equals(BotState.ENTER_CLIENT_NAME)) {
                    System.out.println(message.getText());
                    telegramUser.setClientName(message.getText());
                    changeData(telegramUser);
                    sendMessageForGetClientAddress(chatId);
                } else if (telegramUser.getState().equals(BotState.ENTER_CLIENT_ADDRESS)) {
                    telegramUser.setClientAddress(message.getText());
                    changeData(telegramUser);
                    sendMsgForGetPhoneNumber(chatId);
                } else if (telegramUser.getState().equals(BotState.ENTER_CLIENT_PHONE)) {
                    confirmPhoneNumber(chatId, message.getText());
                } else if (telegramUser.getState().equals(BotState.ENTER_CLIENT_INN)) {
                    telegramUser.setClientInn(message.getText());
                    changeData(telegramUser);
                    sendLocationForGetClientLocation(chatId);
                }
            } else if (message.hasLocation()) {
                if (telegramUser.getState().equals(BotState.ENTER_CLIENT_LOCATION)) {
                    confirmLocation(message);
                }
            }
        } else if (update.hasCallbackQuery()) {
            CallbackQuery callbackQuery = update.getCallbackQuery();
            Long chatId = callbackQuery.getMessage().getChatId();
            String data = callbackQuery.getData();
            if (telegramUser.getState().equals(BotState.SELECT_CUSTOM_CATEGORY)) {
                if (data.equals(BotCallBackData.PAGE_NATION_PREV.name())) {
                    sendSelectCustomCategoryMenu(chatId, pageNationPrev(chatId));
                } else if (data.equals(BotCallBackData.PAGE_NATION_NEXT.name())) {
                    sendSelectCustomCategoryMenu(chatId, pageNationNext(chatId));
                } else {
                    telegramUser.setCustomCategoryId(Integer.valueOf(data));
                    telegramUser.setCurrentPage(0);
                    changeData(telegramUser);
                    execute(new DeleteMessage(chatId.toString(), telegramUser.getMessageId()));
                    sendClientTerritoryMenu(chatId, PageRequest.of(telegramUser.getCurrentPage(), 10));
                }
            } else if (telegramUser.getState().equals(BotState.SELECT_TERRITORY)) {
                if (data.equals(BotCallBackData.PAGE_NATION_PREV.name())) {
                    sendClientTerritoryMenu(chatId, pageNationPrev(chatId));
                } else if (data.equals(BotCallBackData.PAGE_NATION_NEXT.name())) {
                    sendClientTerritoryMenu(chatId, pageNationNext(chatId));
                } else {
                    telegramUser.setTerritoryId(UUID.fromString(data));
                    telegramUser.setCurrentPage(0);
                    changeData(telegramUser);
                    execute(new DeleteMessage(chatId.toString(), telegramUser.getMessageId()));
                    sendMessageForGetClientName(chatId);
                }
            } else if (telegramUser.getState().equals(BotState.CONFIRM_PHONE)) {
                if (data.equals(BotCallBackData.CONFIRM_SUCCESS.name())) {
                    execute(new DeleteMessage(chatId.toString(), telegramUser.getMessageId()));
                    sendMsgForGetClientINN(chatId);
                } else if (data.equals(BotCallBackData.CONFIRM_CANCEL.name())) {
                    execute(new DeleteMessage(chatId.toString(), telegramUser.getMessageId()));
                    sendMsgForGetPhoneNumber(chatId);
                }
            } else if (telegramUser.getState().equals(BotState.CONFIRM_LOCATION)) {
                if (data.equals(BotCallBackData.CONFIRM_SUCCESS.name())) {
                    execute(new DeleteMessage(chatId.toString(), telegramUser.getMessageId()));
                    saveClient(chatId);
                    botMainMenu(chatId, callbackQuery.getFrom().getFirstName());
                } else if (data.equals(BotCallBackData.CONFIRM_CANCEL.name())) {
                    execute(new DeleteMessage(chatId.toString(), telegramUser.getMessageId()));
                    sendLocationForGetClientLocation(chatId);
                }
            }
        }
    }

    private void saveClient(Long chatId) throws TelegramApiException {
        try {
            CustomerCategory customerCategory = customerCategoryRepo.findById(telegramUser.getCustomCategoryId()).orElseThrow();
            Territory territory = territoryRepo.findById(telegramUser.getTerritoryId()).orElseThrow();
            clientRepo.save(Client.builder()
                    .category(customerCategory)
                    .territory(territory)
                    .name(telegramUser.getClientName())
                    .tin(telegramUser.getClientInn())
                    .address(telegramUser.getClientAddress())
                    .company("")
                    .longitude(telegramUser.getClientLongitude())
                    .latitude(telegramUser.getClientLatitude())
                    .phone(telegramUser.getClientPhone())
                    .referencePoint("")
                    .build());
            execute(SendMessage.builder()
                    .chatId(chatId)
                    .text("<b>Mijoz muvaffaqiyatli qo'shildi ✅</b>")
                    .parseMode(ParseMode.HTML)
                    .build());
        } catch (Exception e) {
            execute(SendMessage.builder()
                    .chatId(chatId)
                    .text("<b>Mijoz qo'shishda muammo yuzaga keldi ❌</b>")
                    .parseMode(ParseMode.HTML)
                    .build());
        }
    }

    @SneakyThrows
    private void confirmLocation(Message message) {
        Location location = message.getLocation();
        telegramUser.setClientLongitude(location.getLongitude());
        telegramUser.setClientLatitude(location.getLatitude());
        telegramUser.setState(BotState.CONFIRM_LOCATION);
        Message execute = execute(SendMessage.builder()
                .chatId(message.getChatId())
                .text("<b>Kiritgan joylashuvingizni tasdiqlaysizmi?</b>")
                .parseMode(ParseMode.HTML)
                .replyMarkup(confirmButtons())
                .build());
        telegramUser.setMessageId(execute.getMessageId());
        changeData(telegramUser);
    }

    @SneakyThrows
    private void sendLocationForGetClientLocation(Long chatId) {
        execute(SendMessage.builder()
                .chatId(chatId)
                .text("<b>\uD83D\uDCCD Mijoz joylashgan o'rnini jo'nating:</b>")
                .parseMode(ParseMode.HTML)
                .replyMarkup(generateLocationBtn())
                .build());
        telegramUser.setState(BotState.ENTER_CLIENT_LOCATION);
        changeData(telegramUser);
    }

    private ReplyKeyboard generateLocationBtn() {
        List<KeyboardRow> rows = new ArrayList<>();
        KeyboardRow firstRow = new KeyboardRow();
        KeyboardButton button = new KeyboardButton();
        button.setRequestLocation(true);
        button.setText("\uD83D\uDCCD Joylashuvni ulashish");
        firstRow.add(button);
        rows.add(firstRow);
        return ReplyKeyboardMarkup.builder()
                .keyboard(rows)
                .resizeKeyboard(true)
                .build();
    }

    @SneakyThrows
    private void sendMsgForGetClientINN(Long chatId) {
        execute(SendMessage.builder()
                .chatId(chatId)
                .text("<b>\uD83D\uDCC3 Mijoz INNsini kiriting:</b>\n" +
                      "<i>Namuna: 1234567</i>")
                .parseMode(ParseMode.HTML)
                .build());
        telegramUser.setState(BotState.ENTER_CLIENT_INN);
        changeData(telegramUser);
    }

    private void confirmPhoneNumber(Long chatId, String text) throws TelegramApiException {
        telegramUser.setClientPhone(text);
        telegramUser.setState(BotState.CONFIRM_PHONE);
        Message execute = execute(SendMessage.builder()
                .chatId(chatId)
                .text("<b>Telefon raqamni tasdiqlasysizmi? <i>" + text + "</i></b>")
                .replyMarkup(confirmButtons())
                .parseMode(ParseMode.HTML)
                .build()
        );
        telegramUser.setMessageId(execute.getMessageId());
        changeData(telegramUser);

    }

    private static InlineKeyboardMarkup confirmButtons() {
        InlineKeyboardMarkup inlineKeyboardMarkup = new InlineKeyboardMarkup();
        List<List<InlineKeyboardButton>> rows = new ArrayList<>();
        List<InlineKeyboardButton> row = new ArrayList<>();
        InlineKeyboardButton no = new InlineKeyboardButton();
        InlineKeyboardButton yes
                = new InlineKeyboardButton();
        no.setText("Yo'q ❌");
        yes.setText("Ha ✅");
        no.setCallbackData(BotCallBackData.CONFIRM_CANCEL.name());
        yes.setCallbackData(BotCallBackData.CONFIRM_SUCCESS.name());
        row.add(yes);
        row.add(no);
        rows.add(row);
        inlineKeyboardMarkup.setKeyboard(rows);
        return inlineKeyboardMarkup;
    }

    @SneakyThrows
    private void sendMsgForGetPhoneNumber(Long chatId) {
        execute(SendMessage.builder()
                .chatId(chatId)
                .text("<b>\uD83D\uDCDE Mijoz telefon raqamini kiriting:</b>\n" +
                      "<i>Namuna: +998901234567</i>")
                .parseMode(ParseMode.HTML)
                .build());
        telegramUser.setState(BotState.ENTER_CLIENT_PHONE);
        changeData(telegramUser);
    }

    @SneakyThrows
    private void sendMessageForGetClientAddress(Long chatId) {
        execute(SendMessage.builder()
                .chatId(chatId)
                .text("<b>\uD83D\uDCDD Mijoz addressini kiriting:</b>\n" +
                      "<i>Namuna: Toshkent shahar, Chirchiq tuman, Mustaqillik ko'chasi 47</i>")
                .parseMode(ParseMode.HTML)
                .build());
        telegramUser.setState(BotState.ENTER_CLIENT_ADDRESS);
        changeData(telegramUser);
    }

    @SneakyThrows
    private void sendMessageForGetClientName(Long chatId) {
        Message execute = execute(SendMessage.builder()
                .chatId(chatId)
                .text("<b>\uD83D\uDC64 Mijoz ism, familiyasini kiriting:</b>\n" +
                      "<i>Namuna: Abdullayev Abdulla</i>")
                .parseMode(ParseMode.HTML)
                .build());
        telegramUser.setMessageId(execute.getMessageId());
        telegramUser.setState(BotState.ENTER_CLIENT_NAME);
        changeData(telegramUser);
    }

    @SneakyThrows
    private void sendClientTerritoryMenu(Long chatId, PageRequest pageRequest) {
        Page<Territory> whitSearch = territoryRepo.findWhitSearch(true, "", pageRequest);
        Pageable pageable = whitSearch.getPageable();
        List<Territory> content = whitSearch.getContent();
        List<PageNation> pageNations = new ArrayList<>();
        for (Territory territory : content) {
            pageNations.add(new PageNation(String.valueOf(territory.getId()), territory.getTitle()));
        }
        Message execute = execute(SendMessage.builder()
                .chatId(chatId)
                .text("<b>\uD83C\uDFD8 Mijoz uchun hududni tanlang</b>")
                .parseMode(ParseMode.HTML)
                .replyMarkup(generatedPageNation(pageNations, pageable.getPageNumber(), whitSearch.getTotalPages()))
                .build());
        telegramUser.setMessageId(execute.getMessageId());
        telegramUser.setState(BotState.SELECT_TERRITORY);
        changeData(telegramUser);
    }

    @SneakyThrows
    private PageRequest pageNationNext(Long chatId) {
        telegramUser.setCurrentPage(telegramUser.getCurrentPage() + 1);
        changeData(telegramUser);
        PageRequest pageRequest = PageRequest.of(telegramUser.getCurrentPage(), 10);
        execute(new DeleteMessage(chatId.toString(), telegramUser.getMessageId()));
        return pageRequest;
    }

    @SneakyThrows
    private PageRequest pageNationPrev(Long chatId) {
        telegramUser.setCurrentPage(telegramUser.getCurrentPage() - 1);
        changeData(telegramUser);
        PageRequest pageRequest = PageRequest.of(telegramUser.getCurrentPage(), 10);
        execute(new DeleteMessage(chatId.toString(), telegramUser.getMessageId()));
        return pageRequest;
    }

    @SneakyThrows
    private void sendSelectCustomCategoryMenu(Long chatId, PageRequest pageRequest) {
        Page<CustomerCategory> customerCategories = customerCategoryRepo.findBySearch(true, "", pageRequest);
        int totalPages = customerCategories.getTotalPages();
        Pageable pageable = customerCategories.getPageable();
        List<CustomerCategory> content = customerCategories.getContent();
        List<PageNation> pageNations = new ArrayList<>();
        for (CustomerCategory customerCategory : content) {
            pageNations.add(new PageNation(String.valueOf(customerCategory.getId()), customerCategory.getTitle()));
        }
        Message execute = execute(SendMessage.builder()
                .chatId(chatId)
                .text("<b>\uD83E\uDDE9 Mijoz faoliyati turini tanlang</b>")
                .replyMarkup(generatedPageNation(pageNations, pageable.getPageNumber(), totalPages))
                .parseMode(ParseMode.HTML)
                .build());
        telegramUser.setMessageId(execute.getMessageId());
        telegramUser.setState(BotState.SELECT_CUSTOM_CATEGORY);
    }

    private ReplyKeyboard generatedPageNation(List<PageNation> pageNations, int pageNumber, int totalPages) {
        List<List<InlineKeyboardButton>> rows = new ArrayList<>();
        for (PageNation pageNation : pageNations) {
            List<InlineKeyboardButton> row = new ArrayList<>();
            InlineKeyboardButton button = new InlineKeyboardButton();
            button.setText(pageNation.getTitle());
            button.setCallbackData(pageNation.getId());
            row.add(button);
            rows.add(row);
        }
        List<InlineKeyboardButton> row = getNextAndPrevButtons(pageNumber, totalPages);
        rows.add(row);
        InlineKeyboardMarkup inlineKeyboardMarkup = new InlineKeyboardMarkup();
        inlineKeyboardMarkup.setKeyboard(rows);
        return inlineKeyboardMarkup;
    }

    private static List<InlineKeyboardButton> getNextAndPrevButtons(int pageNumber, int totalPages) {
        List<InlineKeyboardButton> row = new ArrayList<>();
        if (pageNumber != 0) {
            InlineKeyboardButton prev = new InlineKeyboardButton();
            prev.setText("⬅️");
            prev.setCallbackData(BotCallBackData.PAGE_NATION_PREV.name());
            row.add(prev);
        }
        if (totalPages != pageNumber + 1) {
            InlineKeyboardButton next = new InlineKeyboardButton();
            next.setText("➡️");
            next.setCallbackData(BotCallBackData.PAGE_NATION_NEXT.name());
            row.add(next);
        }
        return row;
    }

    private void botMainMenu(Long chatId, String message) throws TelegramApiException {
        execute(SendMessage.builder()
                .chatId(chatId)
                .text("<b>Assalomu Alaykum \uD83D\uDC4B\uD83C\uDFFB " + message + "</b>")
                .parseMode(ParseMode.HTML)
                .replyMarkup(generatedMenuSuperVisor())
                .build());
        telegramUser.setState(BotState.SELECT_MENU);
        changeData(telegramUser);
    }

    private void changeData(TelegramUser telegramUser) {
        telegramUserRepo.save(telegramUser);
    }

    private ReplyKeyboard generatedMenuSuperVisor() {
        ReplyKeyboardMarkup replyKeyboardMarkup = new ReplyKeyboardMarkup();
        replyKeyboardMarkup.setResizeKeyboard(true);
        List<KeyboardRow> rows = new ArrayList<>();
        KeyboardRow firstRow = new KeyboardRow();
        KeyboardButton addClient = new KeyboardButton();
        addClient.setText("Yangi Mijoz qo’shish");
        firstRow.add(addClient);
        rows.add(firstRow);
        replyKeyboardMarkup.setKeyboard(rows);
        return replyKeyboardMarkup;
    }

    private TelegramUser getUserByChatId(Long chatId) {
        TelegramUser byChatId = telegramUserRepo.findByChatId(chatId);
        return Objects.requireNonNullElseGet(byChatId, () -> telegramUserRepo.save(new TelegramUser(
                chatId,
                BotState.START
        )));
    }

    @Autowired
    public MyBot(TelegramBotsApi api, CustomerCategoryRepo customerCategoryRepo, TelegramUserRepo telegramUserRepo, TerritoryRepo territoryRepo, ClientRepo clientRepo) throws TelegramApiException {
        api.registerBot(this);
        this.customerCategoryRepo = customerCategoryRepo;
        this.telegramUserRepo = telegramUserRepo;
        this.territoryRepo = territoryRepo;
        this.clientRepo = clientRepo;
    }

    @PostConstruct
    public void start() {
        System.out.println("worked");
    }

    @Override
    public String getBotToken() {
        return "6442324062:AAFWUdBCzpe8z66-58jwfiWZh6IyarSeqFU";
    }

    @Override
    public String getBotUsername() {
        return "@ubmuz_bot";
    }
}
