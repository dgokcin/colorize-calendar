// Emoji map for event types
const emojiMap = {
  interview: "🎙️",
  flight: "🛫",
  bus: "🚌",
  journey: "🚆",
  trip: "🚆",
  travel: "🚇",
  stay: "🏠",
  "holy shred": "💪",
  "holy ride": "🚵",
  "holy wellness": "🧖",
  padel: "🏸",
  meeting: "🤝",
  "catch-up": "☕",
  "video call": "📹",
  call: "📞",
  ara: "📞",
  "sosyal aktivite": "🎉",
  "paris 2024": "🏅",
  randevu: "📅",
  reservation: "📅",
  appointment: "📅",
  tamir: "🛠️",
  repair: "🛠️",
  payment: "💸",
  "start date": "🏁",
  "gas and electricity": "🔌",
  ticket: "🎫",
  masaj: "💆",
  massage: "💆",
  "aksiyon al": "🎯",
  yemek: "🍽️",
  dinner: "🍽️",
};

function ColorEvents() {
  const isDevelopment = false; // Development flag
  var today = new Date();
  var nextThreeMonths = new Date();

  nextThreeMonths.setMonth(nextThreeMonths.getMonth() + 3);

  var startDate = today;
  var endDate = nextThreeMonths;

  // Development mode date range override
  if (isDevelopment) {
    startDate = new Date("2023-08-01"); // YYYY-MM-DD
    endDate = new Date("2024-08-31"); // YYYY-MM-DD
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
        const regex = new RegExp(key, "i"); // Case-insensitive match
        if (regex.test(title)) {
          if (!title.startsWith(emoji)) {
            title = `${emoji} ${title}`;
          }
          break; // Stop after first match to avoid multiple emojis
        }
      }

      // Convert title to lower case for case-insensitive checks
      const lowerTitle = title.toLowerCase();

      // Regular expressions for whole word matching
      const regexMap = {
        interview: /\binterview\b/i,
        flight: /\bflight\b/i,
        journey: /\bjourney\b/i,
        trip: /\btrip\b/i,
        travel: /\btravel\b/i,
        bus: /\bbus\b/i,
        stay: /\bstay\b/i,
        reservation: /\breservation\b/i,
        "holy shred": /\bholy shred\b/i,
        "holy ride": /\bholy ride\b/i,
        "holy wellness": /\bholy wellness\b/i,
        padel: /\bpadel\b/i,
        meeting: /\bmeeting\b/i,
        "catch-up": /\bcatch-up\b/i,
        "video call": /\bvideo call\b/i,
        call: /\bcall\b/i,
        ara: /\bara\b/i,
        "sosyal aktivite": /\bsosyal aktivite\b/i,
        "paris 2024": /\bparis 2024\b/i,
        randevu: /\brandevu\b/i,
        appointment: /\bappointment\b/i,
        "start date": /\bstart date\b/i,
        "gas and electricity": /\bgas and electricity\b/i,
        tamir: /\btamir\b/i,
        repair: /\brepair\b/i,
        payment: /\bpayment\b/i,
        ticket: /\bticket\b/i,
        masaj: /\bmasaj\b/i,
        massage: /\bmassage\b/i,
        "aksiyon al": /\baksiyon al\b/i,
        yemek: /\byemek\b/i,
        dinner: /\bdinner\b/i,
      };

      // Check the updated title for colorization using regex
      if (regexMap["interview"].test(lowerTitle)) {
        color = CalendarApp.EventColor.YELLOW;
        Logger.log("Title: " + title + " - Color to print: YELLOW");
      } else if (
        regexMap["flight"].test(lowerTitle) ||
        regexMap["journey"].test(lowerTitle) ||
        regexMap["trip"].test(lowerTitle) ||
        regexMap["bus"].test(lowerTitle) ||
        regexMap["travel"].test(lowerTitle)
      ) {
        color = CalendarApp.EventColor.ORANGE;
        Logger.log("Title: " + title + " - Color to print: ORANGE");
      } else if (
        regexMap["stay"].test(lowerTitle) ||
        regexMap["reservation"].test(lowerTitle)
      ) {
        color = CalendarApp.EventColor.PALE_BLUE;
        Logger.log("Title: " + title + " - Color to print: PALE_BLUE");
      } else if (
        regexMap["holy shred"].test(lowerTitle) ||
        regexMap["holy ride"].test(lowerTitle) ||
        regexMap["holy wellness"].test(lowerTitle) ||
        regexMap["padel"].test(lowerTitle) ||
        regexMap["masaj"].test(lowerTitle) ||
        regexMap["massage"].test(lowerTitle)
      ) {
        color = CalendarApp.EventColor.BLUE;
        Logger.log("Title: " + title + " - Color to print: BLUE");
      } else if (
        regexMap["meeting"].test(lowerTitle) ||
        regexMap["catch-up"].test(lowerTitle) ||
        regexMap["video call"].test(lowerTitle) ||
        regexMap["call"].test(lowerTitle) ||
        regexMap["ara"].test(lowerTitle)
      ) {
        color = CalendarApp.EventColor.MAUVE;
        Logger.log("Title: " + title + " - Color to print: MAUVE");
      } else if (
        regexMap["sosyal aktivite"].test(lowerTitle) ||
        regexMap["ticket"].test(lowerTitle)
      ) {
        color = CalendarApp.EventColor.PALE_GREEN;
        Logger.log("Title: " + title + " - Color to print: PALE_GREEN");
      } else if (regexMap["paris 2024"].test(lowerTitle)) {
        color = CalendarApp.EventColor.BLUE;
        Logger.log("Title: " + title + " - Color to print: BLUE");
      } else if (
        regexMap["randevu"].test(lowerTitle) ||
        regexMap["appointment"].test(lowerTitle) ||
        regexMap["gas and electricity"].test(lowerTitle) ||
        regexMap["start date"].test(lowerTitle) ||
        regexMap["yemek"].test(lowerTitle) ||
        regexMap["dinner"].test(lowerTitle) ||
        regexMap["aksiyon al"].test(lowerTitle)
      ) {
        color = CalendarApp.EventColor.GRAY;
        Logger.log("Title: " + title + " - Color to print: GRAY");
      } else if (
        regexMap["tamir"].test(lowerTitle) ||
        regexMap["repair"].test(lowerTitle)
      ) {
        color = CalendarApp.EventColor.PINK;
        Logger.log("Title: " + title + " - Color to print: PINK");
      } else if (regexMap["payment"].test(lowerTitle)) {
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
          Logger.log(
            "Error updating event: " +
              error.toString() +
              " - Title: " +
              originalTitle
          );
          // Optionally, you can continue with the next event
          continue;
        }
      }
    }
  }
}
