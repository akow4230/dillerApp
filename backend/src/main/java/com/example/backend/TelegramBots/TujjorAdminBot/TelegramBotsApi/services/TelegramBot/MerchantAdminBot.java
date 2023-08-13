package com.example.backend.TelegramBots.TujjorAdminBot.TelegramBotsApi.services.TelegramBot;

import com.example.backend.Entity.Client;
import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Entity.TelegramUser;
import com.example.backend.Entity.Territory;
import com.example.backend.Enums.BotCallBackData;
import com.example.backend.Enums.BotState;
import com.example.backend.Repository.ClientRepo;
import com.example.backend.Repository.CustomerCategoryRepo;
import com.example.backend.Repository.TelegramUserRepo;
import com.example.backend.Repository.TerritoryRepo;
import com.example.backend.TelegramBots.TujjorAdminBot.TelegramBotsApi.entiy.MockData.MockData;
import com.example.backend.TelegramBots.TujjorAdminBot.TelegramBotsApi.entiy.PageNation;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
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

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MerchantAdminBot implements TelegramWebhookBot {

    private final TelegramUserRepo telegramUserRepo;
    private final CustomerCategoryRepo customerCategoryRepo;
    private final TerritoryRepo territoryRepo;
    private TelegramUser telegramUser;
    private final ClientRepo clientRepo;

    @SneakyThrows
    @Override
    @Transactional
    public void onUpdateReceived(Update update) {
        if (update.hasMessage()) {
            Message message = update.getMessage();
            Long chatId = message.getChatId();
            telegramUser = getUserByChatId(chatId);
            if (message.hasText()) {
                String text = message.getText();
                if (message.getText().equalsIgnoreCase("/start")) {
                    SendMessage sendMessage = SendMessage.builder()
                            .chatId(chatId)
                            .text("<b>" + message.getFrom().getFirstName() + "</b>")
                            .parseMode(ParseMode.HTML)
                            .replyMarkup(generatedMenuSuperVisor())
                            .build();
                    execute.send(sendMessage);
                    changeState(BotState.SELECT_MENU);
                } else if (telegramUser.getState().equals(BotState.SELECT_MENU) && text.equals("Yangi Mijoz qo’shish")) {
                    PageRequest pageRequest = PageRequest.of(telegramUser.getCurrentPage(), 10);
                    sendSelectCustomCategoryMenu(chatId, pageRequest);
                } else if (telegramUser.getState().equals(BotState.ENTER_CLIENT_NAME)) {
                    MockData.client.setName(message.getText());
                    sendMessageForGetClientAddress(chatId);
                } else if (telegramUser.getState().equals(BotState.ENTER_CLIENT_ADDRESS)) {
                    MockData.client.setAddress(message.getText());
                    sendMsgForGetPhoneNumber(chatId);
                } else if (telegramUser.getState().equals(BotState.ENTER_CLIENT_PHONE)) {
                    MockData.client.setPhone(message.getText());
                    sendMsgForGetClientINN(chatId);
                } else if (telegramUser.getState().equals(BotState.ENTER_CLIENT_INN)) {
                    MockData.client.setInn(message.getText());
                    sendLocationForGetClientLocation(chatId);
                }
            } else if (message.hasLocation()) {
                if (telegramUser.getState().equals(BotState.ENTER_CLIENT_LOCATION)) {
                    Location location = message.getLocation();
                    Double longitude = location.getLongitude();
                    Double latitude = location.getLatitude();
                    MockData.client.setLongitude(longitude);
                    MockData.client.setLatitude(latitude);
                    saveClient(chatId);
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
                    MockData.client.setCustomCategoryId(Integer.valueOf(data));
                    telegramUser.setCurrentPage(0);
                    execute.send(new DeleteMessage(chatId.toString(), telegramUser.getMessageId()));
                    sendClientTerritoryMenu(chatId, PageRequest.of(telegramUser.getCurrentPage(), 10));
                }
            } else if (telegramUser.getState().equals(BotState.SELECT_TERRITORY)) {
                if (data.equals(BotCallBackData.PAGE_NATION_PREV.name())) {
                    sendClientTerritoryMenu(chatId, pageNationPrev(chatId));
                } else if (data.equals(BotCallBackData.PAGE_NATION_NEXT.name())) {
                    sendClientTerritoryMenu(chatId, pageNationNext(chatId));
                } else {
                    MockData.client.setTerritoryId(UUID.fromString(data));
                    telegramUser.setCurrentPage(0);
                    execute.send(new DeleteMessage(chatId.toString(), telegramUser.getMessageId()));
                    sendMessageForGetClientName(chatId);
                }
            }
        }
    }

    @Transactional
    public void saveClient(Long chatId) {
        try {
            CustomerCategory customerCategory = customerCategoryRepo.findById(MockData.client.getCustomCategoryId()).orElseThrow();
            Territory territory = territoryRepo.findById(MockData.client.getTerritoryId()).orElseThrow();
            clientRepo.save(Client.builder()
                    .category(customerCategory)
                    .territory(territory)
                    .name(MockData.client.getName())
                    .phone(MockData.client.getPhone())
                    .longitude(MockData.client.getLongitude())
                    .latitude(MockData.client.getLatitude())
                    .tin(MockData.client.getInn())
                    .address(MockData.client.getAddress())
                    .dateOfRegistration(LocalDate.now())
                    .build());
            execute.send(SendMessage.builder()
                    .chatId(chatId)
                    .parseMode(ParseMode.HTML)
                    .text("<b>✅ Mijoz muvaffaqiyatli qo'shildi</b>")
                    .build());
        } catch (Exception e) {
            execute.send(SendMessage.builder()
                    .chatId(chatId)
                    .parseMode(ParseMode.HTML)
                    .text("<b>Mijozni ro'yxatga olishda muammo yuzaga keldi ⚠️</b>")
                    .build());
        }
    }

    private void sendLocationForGetClientLocation(Long chatId) {
        execute.send(SendMessage.builder()
                .chatId(chatId)
                .text("<b>\uD83D\uDCCD Mijoz joylashgan o'rnini jo'nating:</b>")
                .parseMode(ParseMode.HTML)
                .replyMarkup(generateLocationBtn())
                .build());
        changeState(BotState.ENTER_CLIENT_LOCATION);
    }

    private ReplyKeyboardMarkup generateLocationBtn() {
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

    private void sendMsgForGetClientINN(Long chatId) {
        execute.send(SendMessage.builder()
                .chatId(chatId)
                .text("<b>\uD83D\uDCC3 Mijoz INNsini kiriting:</b>\n" +
                      "<i>Namuna: 1234567</i>")
                .parseMode(ParseMode.HTML)
                .build()
        );
        changeState(BotState.ENTER_CLIENT_INN);
    }

    private void sendMessageForGetClientAddress(Long chatId) {
        changeMessageId(execute.send(SendMessage.builder()
                .chatId(chatId)
                .text("<b>\uD83D\uDCDD Mijoz addressini kiriting:</b>\n" +
                      "<i>Namuna: Toshkent shahar, Chirchiq tuman, Mustaqillik ko'chasi 47</i>")
                .parseMode(ParseMode.HTML)
                .build()));
        changeState(BotState.ENTER_CLIENT_ADDRESS);
    }

    private void changeMessageId(com.example.backend.TelegramBots.TujjorAdminBot.TelegramBotsApi.response.Message message) {
        telegramUser.setMessageId(message.getResult().getMessageId());
        telegramUserRepo.save(telegramUser);
    }

    private void sendMessageForGetClientName(Long chatId) {
        changeState(BotState.ENTER_CLIENT_NAME);
        SendMessage sendMessage = SendMessage.builder()
                .chatId(chatId)
                .text("<b>\uD83D\uDC64 Mijoz ism, familiyasini kiriting:</b>\n" +
                      "<i>Namuna: Abdullayev Abdulla</i>")
                .parseMode(ParseMode.HTML)
                .build();
        com.example.backend.TelegramBots.TujjorAdminBot.TelegramBotsApi.response.Message message = execute.send(sendMessage);
        changeMessageId(message);
    }


    private PageRequest pageNationNext(Long chatId) {
        telegramUser.setCurrentPage(telegramUser.getCurrentPage() + 1);
        PageRequest pageRequest = PageRequest.of(telegramUser.getCurrentPage(), 10);
        execute.send(new DeleteMessage(chatId.toString(), telegramUser.getMessageId()));
        return pageRequest;
    }

    private PageRequest pageNationPrev(Long chatId) {
        telegramUser.setCurrentPage(telegramUser.getCurrentPage() - 1);
        PageRequest pageRequest = PageRequest.of(telegramUser.getCurrentPage(), 10);
        execute.send(new DeleteMessage(chatId.toString(), telegramUser.getMessageId()));
        return pageRequest;
    }

    private void sendClientTerritoryMenu(Long chatId, PageRequest pageRequest) {
        changeState(BotState.SELECT_TERRITORY);
        Page<Territory> whitSearch = territoryRepo.findWhitSearch(true, "", pageRequest);
        Pageable pageable = whitSearch.getPageable();
        List<Territory> content = whitSearch.getContent();
        List<PageNation> pageNations = new ArrayList<>();
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < content.size(); i++) {
            stringBuilder.append((Math.max(pageable.getPageNumber(), 0)) * pageable.getPageSize() + (i + 1)).append(" ").append(content.get(i).getTitle()).append("\n");
            pageNations.add(new PageNation(String.valueOf(content.get(i).getId()), String.valueOf((Math.max(pageable.getPageNumber(), 0)) * pageable.getPageSize() + (i + 1))));
        }
        SendMessage sendMessage = SendMessage.builder()
                .chatId(chatId)
                .text("<b>\uD83C\uDFD8 Mijoz uchun hududni tanlang</b> \n\n" + stringBuilder)
                .parseMode(ParseMode.HTML)
                .replyMarkup(generatedPageNation(pageNations, pageable.getPageNumber(), whitSearch.getTotalPages()))
                .build();
        com.example.backend.TelegramBots.TujjorAdminBot.TelegramBotsApi.response.Message message = execute.send(sendMessage);
        changeMessageId(message);
    }


    private void sendSelectCustomCategoryMenu(Long chatId, PageRequest pageRequest) {
        Page<CustomerCategory> customerCategories = customerCategoryRepo.findBySearch(true, "", pageRequest);
        int totalPages = customerCategories.getTotalPages();
        Pageable pageable = customerCategories.getPageable();
        StringBuilder stringBuilder = new StringBuilder();
        List<CustomerCategory> content = customerCategories.getContent();
        List<PageNation> pageNations = new ArrayList<>();
        for (int i = 0; i < content.size(); i++) {
            stringBuilder.append((Math.max(pageable.getPageNumber(), 0)) * pageable.getPageSize() + (i + 1)).append(" ").append(content.get(i).getTitle()).append("\n");
            pageNations.add(new PageNation(String.valueOf(content.get(i).getId()), String.valueOf((Math.max(pageable.getPageNumber(), 0)) * pageable.getPageSize() + (i + 1))));
        }
        SendMessage sendMessage = SendMessage.builder()
                .chatId(chatId)
                .text("<b>\uD83E\uDDE9 Mijoz faoliyati turini tanlang</b>\n\n" + stringBuilder)
                .replyMarkup(generatedPageNation(pageNations, pageable.getPageNumber(), totalPages))
                .parseMode(ParseMode.HTML)
                .build();
        com.example.backend.TelegramBots.TujjorAdminBot.TelegramBotsApi.response.Message send = execute.send(sendMessage);
        changeMessageId(send);
        changeState(BotState.SELECT_CUSTOM_CATEGORY);
    }

    private InlineKeyboardMarkup generatedPageNation(List<PageNation> pageNations, int page, int totalPages) {
        List<List<InlineKeyboardButton>> rows = new ArrayList<>();
        int size = pageNations.size();
        double ceil = Math.ceil((double) size / 5);
        for (int i = 0; i < ceil; i++) {
            List<InlineKeyboardButton> row = new ArrayList<>();
            rows.add(row);
        }
        int count = 0;
        int currentRow = 0;
        for (PageNation pageNation : pageNations) {
            if (count % 5 == 0 && count != 0) {
                currentRow++;
            }
            InlineKeyboardButton button = new InlineKeyboardButton();
            button.setText(pageNation.getTitle());
            button.setCallbackData(pageNation.getId());
            List<InlineKeyboardButton> row = rows.get(currentRow);
            row.add(button);
            count++;
        }
        List<InlineKeyboardButton> row = getInlineKeyboardButtons(page, totalPages);
        rows.add(row);
        InlineKeyboardMarkup inlineKeyboardMarkup = new InlineKeyboardMarkup();
        inlineKeyboardMarkup.setKeyboard(rows);
        return inlineKeyboardMarkup;
    }

    private static List<InlineKeyboardButton> getInlineKeyboardButtons(int page, int totalPages) {
        List<InlineKeyboardButton> row = new ArrayList<>();
        if (page != 0) {
            InlineKeyboardButton prev = new InlineKeyboardButton();
            prev.setText("⬅️");
            prev.setCallbackData(BotCallBackData.PAGE_NATION_PREV.name());
            row.add(prev);
        }
        if (totalPages != page + 1) {
            InlineKeyboardButton next = new InlineKeyboardButton();
            next.setText("➡️");
            next.setCallbackData(BotCallBackData.PAGE_NATION_NEXT.name());
            row.add(next);
        }
        return row;
    }

    private void sendMsgForGetPhoneNumber(Long chatId) {
        changeState(BotState.ENTER_CLIENT_PHONE);
        SendMessage sendMessage = SendMessage.builder()
                .chatId(chatId)
                .text("<b>\uD83D\uDCDE Mijoz telefon raqamini kiriting:</b>\n" +
                      "<i>Namuna: +998901234567</i>")
                .parseMode(ParseMode.HTML)
                .build();
        changeMessageId(execute.send(sendMessage));
    }


    private void changeState(BotState state) {
        telegramUser.setState(state);
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


}
