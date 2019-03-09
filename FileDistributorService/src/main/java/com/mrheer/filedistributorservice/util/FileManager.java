package com.mrheer.filedistributorservice.util;

import org.springframework.web.multipart.MultipartFile;

import java.util.Hashtable;

public class FileManager {
    private static final Hashtable<String, MultipartFile> fileRepository = new Hashtable<>();

    public static void add(String uid, MultipartFile file) {
        fileRepository.put(uid, file);
    }

    public static MultipartFile get(String uid) {
        return fileRepository.get(uid);
    }

    public static void clear() {
        fileRepository.clear();
    }
}
