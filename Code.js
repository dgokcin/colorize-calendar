// ==============================================
// ACTIVITY CONFIGURATION
// ==============================================
// Defines activities with their associated:
// - emoji: Visual identifier
// - variants: Keywords in different languages (en/tr)
// - category: For color coding and grouping
// ==============================================
const activities = {
  interview: {
    emoji: "🎙️",
    variants: { en: ["interview"], tr: [] },
    category: "interview",
  },
  flight: {
    emoji: "🛫",
    variants: { en: ["flight"], tr: [] },
    category: "travel",
  },
  bus: {
    emoji: "🚌",
    variants: { en: ["bus"], tr: [] },
    category: "travel",
  },
  train: {
    emoji: "🚆",
    variants: { en: ["journey", "trip"], tr: [] },
    category: "travel",
  },
  metro: {
    emoji: "🚇",
    variants: { en: ["travel"], tr: [] },
    category: "travel",
  },
  stay: {
    emoji: "🏠",
    variants: { en: ["stay"], tr: [] },
    category: "accommodation",
  },
  barber: {
    emoji: "💈",
    variants: {
      en: ["barber"],
      tr: ["berber", "sac kestir"],
    },
    category: "wellness",
  },
  workout: {
    emoji: "💪",
    variants: { en: ["holy shred"], tr: [] },
    category: "fitness",
  },
  cycling: {
    emoji: "🚵",
    variants: { en: ["holy ride"], tr: [] },
    category: "fitness",
  },
  spa: {
    emoji: "🧖",
    variants: { en: ["holy wellness"], tr: [] },
    category: "wellness",
  },
  padel: {
    emoji: "🏸",
    variants: { en: ["padel"], tr: [] },
    category: "fitness",
  },
  meeting: {
    emoji: "🤝",
    variants: { en: ["meeting"], tr: [] },
    category: "personal",
  },
  coffee: {
    emoji: "☕",
    variants: { en: ["catch-up"], tr: [] },
    category: "social",
  },
  videoCall: {
    emoji: "📹",
    variants: { en: ["video call"], tr: [] },
    category: "communication",
  },
  phone: {
    emoji: "📞",
    variants: { en: ["call"], tr: ["ara"] },
    category: "communication",
  },
  social: {
    emoji: "🎉",
    variants: { en: ["sosyal aktivite"], tr: [] },
    category: "social",
  },
  casino: {
    emoji: "🎰",
    variants: { en: ["casino"], tr: [] },
    category: "entertainment",
  },
  sports: {
    emoji: "🏅",
    variants: { en: ["paris 2024"], tr: [] },
    category: "event",
  },
  appointment: {
    emoji: "📅",
    variants: {
      en: ["appointment", "reservation", "start date"],
      tr: ["randevu"],
    },
    category: "schedule",
  },
  repair: {
    emoji: "🛠️",
    variants: {
      en: ["repair"],
      tr: ["tamir"],
    },
    category: "maintenance",
  },
  payment: {
    emoji: "💸",
    variants: { en: ["payment"], tr: [] },
    category: "finance",
  },
  ticket: {
    emoji: "🎫",
    variants: { en: ["ticket"], tr: [] },
    category: "entertainment",
  },
  massage: {
    emoji: "💆",
    variants: { en: ["massage"], tr: ["masaj"] },
    category: "wellness",
  },
  action: {
    emoji: "🎯",
    variants: { en: [], tr: ["aksiyon al"] },
    category: "reminders",
  },
  dinner: {
    emoji: "🍽️",
    variants: {
      en: ["dinner", "meal"],
      tr: ["yemek", "yeme içme"],
    },
    category: "food",
  },
  utilities: {
    emoji: "🔌",
    variants: {
      en: ["gas and electricity"],
      tr: [],
    },
    category: "maintenance",
  },
};

// ==============================================
// CATEGORY COLOR MAPPING
// ==============================================
// Maps activity categories to Google Calendar's
// predefined event colors for visual organization
// ==============================================
const categoryColors = {
  food: CalendarApp.EventColor.GRAY,
  wellness: CalendarApp.EventColor.BLUE,
  schedule: CalendarApp.EventColor.PALE_BLUE,
  finance: CalendarApp.EventColor.GREEN,
  travel: CalendarApp.EventColor.CYAN,
  social: CalendarApp.EventColor.PALE_GREEN,
  personal: CalendarApp.EventColor.MAUVE,
  communication: CalendarApp.EventColor.MAUVE,
  reminders: CalendarApp.EventColor.ORANGE,
  maintenance: CalendarApp.EventColor.ORANGE,
  fitness: CalendarApp.EventColor.BLUE,
  accommodation: CalendarApp.EventColor.CYAN,
  entertainment: CalendarApp.EventColor.PALE_GREEN,
  event: CalendarApp.EventColor.RED,
  interview: CalendarApp.EventColor.YELLOW,
};

// ==============================================
// EMOJI DETECTION
// ==============================================
// Searches event title for activity keywords and
// returns corresponding emoji if found
// Returns empty string if no match
// ==============================================
function getEmoji(input) {
  const lowerInput = input.toLowerCase();
  return (
    Object.values(activities).find((activity) =>
      Object.values(activity.variants).some((langVariants) =>
        langVariants.some((variant) =>
          new RegExp(`\\b${variant}\\b`, "i").test(lowerInput)
        )
      )
    )?.emoji || ""
  );
}

// ==============================================
// COLOR DETECTION
// ==============================================
// Searches event title for activity keywords and
// returns corresponding calendar color if found
// Returns null if no match
// ==============================================
function getEventColor(input) {
  const lowerInput = input.toLowerCase();
  const activity = Object.values(activities).find((activity) =>
    Object.values(activity.variants).some((langVariants) =>
      langVariants.some((variant) =>
        new RegExp(`\\b${variant}\\b`, "i").test(lowerInput)
      )
    )
  );
  return activity ? categoryColors[activity.category] : null;
}

// ==============================================
// CALENDAR EVENT PROCESSOR
// ==============================================
// Main function that:
// 1. Gets events from specified date range
// 2. Adds emojis to event titles if missing
// 3. Sets event colors based on categories
// 4. Logs all changes (real or simulated)
// ==============================================
function ColorEvents() {
  const isDevelopment = true;
  const today = new Date();
  const nextThreeMonths = new Date();
  nextThreeMonths.setMonth(nextThreeMonths.getMonth() + 3);

  const [startDate, endDate] = isDevelopment
    ? [new Date("2025-01-26"), new Date("2025-01-28")]
    : [today, nextThreeMonths];


  CalendarApp.getCalendarsByName("main").forEach((calendar) => {
    calendar.getEvents(startDate, endDate).forEach((event) => {
      const originalTitle = event.getTitle();

      // Get emoji and color (language-agnostic)
      const emoji = getEmoji(originalTitle);
      const color = getEventColor(originalTitle);
      const newTitle =
        emoji && !originalTitle.startsWith(emoji)
          ? `${emoji} ${originalTitle}`
          : originalTitle;

      // Update event if title or color changes needed
      if (newTitle !== originalTitle || color) {
        try {
          if (!isDevelopment) {
            if (newTitle !== originalTitle) event.setTitle(newTitle);
            if (color) event.setColor(color);
          }
          const action = isDevelopment ? "Would update" : "Updated";
          const colorName =
            Object.entries(CalendarApp.EventColor).find(
              ([_, val]) => val === color
            )?.[0] || "NO_COLOR";

          Logger.log(`${action}:
            Original: ${originalTitle}
            New: ${newTitle}
            Color: ${colorName} (${color})`);
        } catch (error) {
          Logger.log(`Error updating ${originalTitle}: ${error}`);
        }
      }
    });
  });
}
