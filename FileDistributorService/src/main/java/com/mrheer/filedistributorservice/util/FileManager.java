package com.mrheer.filedistributorservice.util;

import java.util.Hashtable;

public class FileManager {
    private static final Hashtable<String, byte[]> fileRepository = new Hashtable<>();

    public static void add(String uid, byte[] bytes) {
        fileRepository.put(uid, bytes);
    }

    public static byte[] get(String uid) {
        return fileRepository.get(uid);
    }

    public static void clear() {
        fileRepository.clear();
    }

    public static int getSize() {
        return fileRepository.size();
    }
}
