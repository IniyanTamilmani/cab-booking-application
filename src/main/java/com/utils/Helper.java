package com.utils;

import java.time.DayOfWeek;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.util.Random;
import java.util.regex.Pattern;

public class Helper {
	
	
	public static String convertMillisToDateTime(long millis) {
        LocalDateTime dateTime = LocalDateTime.ofInstant(Instant.ofEpochMilli(millis), ZoneId.systemDefault());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return dateTime.format(formatter);
    }
	
	//to get time and date
	public static String convertMillisToDateAndTime()
	{
		ZonedDateTime istDateTime = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        String formattedDateTime = istDateTime.format(formatter);
        return formattedDateTime;
	}
	
	public static long getCurrentTimeInMillis() {
        ZonedDateTime istDateTime = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
        
        long millis = istDateTime.toInstant().toEpochMilli();
        
        return millis;
    }
	
	 public static long getStartOfWeekEpochMillis() {
	        ZonedDateTime now = ZonedDateTime.now(ZoneOffset.UTC);	        
	        ZonedDateTime startOfWeek = now.truncatedTo(ChronoUnit.DAYS)
	                                      .with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
	        long epochSeconds = startOfWeek.toEpochSecond();
	        return epochSeconds * 1000;
	    }
	
	public static String generateOTP() {
	    Random random = new Random();
	    return  String.valueOf(100000 + random.nextInt(900000)); 
	} 

}
