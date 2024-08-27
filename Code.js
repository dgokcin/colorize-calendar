// Emoji map for event types
const emojiMap = {
  'interview': '🎙️',
  'flight': '🛫',
  'bus': '🚌',
  'journey': '🚆',
  'trip': '🚆',
  'stay': '🏠',
  'holy shred': '💪',
  'holy ride': '🚵',
  'meeting': '🤝',
  'catch-up': '☕',
  'video call': '📹',
  'call': '📞',
  'ara': '📞',
  'sosyal aktivite': '🎉',
  'paris 2024': '🏅',
  'randevu': '📅',
  'reservation': '📅',
  'appointment': '📅',
  'tamir': '🛠️',
  'repair': '🛠️',
  'payment': '💸',
  'gas and electricity': '🔌',
};

function ColorEvents() {
  const isDevelopment = false; // Development flag
  var today = new Date();
  var nextmonth = new Date();

  nextmonth.setDate(nextmonth.getDate() + 31);

  var startDate = today;
  var endDate = nextmonth;

  // Development mode date range override
  if (isDevelopment) {
    startDate = new Date('2023-08-01'); // YYYY-MM-DD
    endDate = new Date('2024-08-31');   // YYYY-MM-DD
  }

  Logger.log("Date range: " + startDate + " to " + endDate);

  Logger.log(today + " " + nextmonth);

  var calendars = CalendarApp.getCalendarsByName("main");
  Logger.log("found number of calendars: " + calendars.length);

  for (var i = 0; i < calendars.length; i++) {
    Logger.log("Calendar: " + calendars[i].getName());
    var calendar = calendars[i];
    var events = calendar.getEvents(startDate, endDate);
    for (var j = 0; j < events.length; j++) {
      var e = events[j];
      var title = e.getTitle();
      var originalTitle = title;
      var color = null;

      // Check for matching event types and add emojis
      for (const [key, emoji] of Object.entries(emojiMap)) {
        const regex = new RegExp(key, 'i'); // Case-insensitive match
        if (regex.test(title)) {
          if (!title.startsWith(emoji)) {
            title = `${emoji} ${title}`;
          }
          break; // Stop after first match to avoid multiple emojis
        }
      }

      if (originalTitle.includes("interview")) {
        color = CalendarApp.EventColor.YELLOW;
        Logger.log("Title: " + title + " - Color to print: YELLOW");
      } else if (originalTitle.includes("flight") || originalTitle.includes("journey") || originalTitle.includes("trip") || originalTitle.includes("bus")) {
        color = CalendarApp.EventColor.ORANGE;
        Logger.log("Title: " + title + " - Color to print: ORANGE");
      } else if (originalTitle.includes("stay") || originalTitle.includes("reservation")) {
        color = CalendarApp.EventColor.PALE_BLUE;
        Logger.log("Title: " + title + " - Color to print: PALE_BLUE");
      } else if (originalTitle.includes("holy shred") || originalTitle.includes("holy ride")) {
        color = CalendarApp.EventColor.RED;
        Logger.log("Title: " + title + " - Color to print: RED");
      } else if (originalTitle.startsWith("🤝 Meeting") || originalTitle.includes("catch-up") || originalTitle.includes("video call") || originalTitle.includes("call") || originalTitle.includes("ara")) {
        color = CalendarApp.EventColor.MAUVE;
        Logger.log("Title: " + title + " - Color to print: MAUVE");
      } else if (originalTitle.includes("sosyal aktivite")) {
        color = CalendarApp.EventColor.PALE_GREEN;
        Logger.log("Title: " + title + " - Color to print: PALE_GREEN");
      } else if (originalTitle.includes("paris 2024")) {
        color = CalendarApp.EventColor.BLUE;
        Logger.log("Title: " + title + " - Color to print: BLUE");
      } else if (originalTitle.includes("randevu") || originalTitle.includes("appointment") || originalTitle.includes("gas and electricity")) {
        color = CalendarApp.EventColor.GRAY;
        Logger.log("Title: " + title + " - Color to print: GRAY");
      }
      else if (originalTitle.includes("tamir") || originalTitle.includes("repair")) {
        color = CalendarApp.EventColor.PINK;
        Logger.log("Title: " + title + " - Color to print: PINK");
      }
      else if (originalTitle.includes("payment")) {
        color = CalendarApp.EventColor.GREEN;
        Logger.log("Title: " + title + " - Color to print: GREEN");
      }

      // Update event title and color if changed
      if (title !== originalTitle || color) {
        try {
          if (!isDevelopment) {
            if (title !== originalTitle) {
              e.setTitle(title);
              Logger.log("Updated title: " + title);
            }
            if (color) {
              e.setColor(color);
            }
          }
        } catch (error) {
          Logger.log("Error updating event: " + error.toString() + " - Title: " + originalTitle);
          // Optionally, you can continue with the next event
          continue;
        }
      }
    }
  }
}