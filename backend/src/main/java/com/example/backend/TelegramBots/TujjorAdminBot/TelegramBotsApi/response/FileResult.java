package com.example.backend.TelegramBots.TujjorAdminBot.TelegramBotsApi.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class FileResult {
    @JsonProperty(value = "file_id")
    private String fileId;
    @JsonProperty(value = "file_unique_id")
    private String fileUniqueId;
    @JsonProperty(value = "file_size")
    private String fileSize;
    @JsonProperty(value = "file_path")
    private String filePath;
}
