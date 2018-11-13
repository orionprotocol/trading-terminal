package ru.dev4j.utils;

import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

public class DateUtils {

	public static Date dayBefore(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.DAY_OF_MONTH, -1);
		return cal.getTime();
	}

	public static Date addDays(Date date, Integer days) {
		Calendar calendar = getCalendarInstance();
		calendar.setTime(date);
		calendar.add(Calendar.DATE, days);
		return calendar.getTime();
	}

	/**
	 * Convert input date params to Date Object.
	 *
	 * @param month
	 * @param day
	 * @param hour
	 * @param minute
	 * @return
	 */
	public static Date getDate(int month, int day, int hour, int minute) {
		Calendar calendar = getCalendarInstance();
		calendar.set(Calendar.MONTH, month - 1);
		calendar.set(Calendar.DAY_OF_MONTH, day);
		calendar.set(Calendar.HOUR_OF_DAY, hour);
		calendar.set(Calendar.MINUTE, minute);
		calendar.set(Calendar.SECOND, 0);
		return calendar.getTime();
	}

	private static Calendar getCalendarInstance() {
		return Calendar.getInstance(TimeZone.getTimeZone("UTC"));
	}
}
