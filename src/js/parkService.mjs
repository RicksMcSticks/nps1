const apiKey = import.meta.env.VITE_NPS_API_KEY;

// -------------------------
// STATIC PARK DATA (Fallback)
// -------------------------
const park = {
  id: "F58C6D24-8D10-4573-9826-65D42B8B83AD",
  url: "https://www.nps.gov/yell/index.htm",
  fullName: "Yellowstone National Park",
  parkCode: "yell",
  description:
    "On March 1, 1872, Yellowstone became the first national park for all to enjoy the unique hydrothermal wonders. Today, millions of people come here each year to camp, hike, and enjoy the majesty of the park.",
  latitude: "44.59824417",
  longitude: "-110.5471695",
  latLong: "lat:44.59824417, long:-110.5471695",
  states: "ID,MT,WY",
  contacts: {
    phoneNumbers: [
      { phoneNumber: "307-344-7381", type: "Voice" },
      { phoneNumber: "307-344-2014", type: "Fax" },
      { phoneNumber: "307-344-2386", type: "TTY" }
    ],
    emailAddresses: [
      {
        description:
          "Contact Yellowstone's park rangers for general park questions, lost and found, or for special use permits.",
        emailAddress: "YELL_Information@nps.gov"
      }
    ]
  },
  addresses: [
    {
      postalCode: "82190",
      city: "Yellowstone National Park",
      stateCode: "WY",
      line1: "2 Officers Row",
      type: "Physical",
      line2: "Yellowstone National Park Headquarters",
      line3: ""
    },
    {
      postalCode: "82190-0168",
      city: "Yellowstone National Park",
      stateCode: "WY",
      line1: "PO Box 168",
      type: "Mailing",
      line2: "",
      line3: ""
    }
  ],
  images: [
    {
      credit: "NPS/Jim Peaco",
      title: "Grand Prismatic Spring",
      altText:
        "Brilliant blues and greens of a hot spring ringed by oranges, yellows, reds, and browns.",
      caption:
        "The bright colors found in Grand Prismatic Spring come from thermophiles—microorganisms that thrive in hot temperatures",
      url: "https://www.nps.gov/common/uploads/structured_data/3C7D5920-1DD8-B71B-0B83F012ED802CEA.jpg"
    }
    // Add more images here if needed
  ],
  weatherInfo:
    "Yellowstone's weather can vary quite a bit, even in a single day. In the summer, daytime highs can exceed 70°F (21°C), only to drop 20 or more degrees when a thunderstorm rolls through. It can snow during any month of the year, and winter lows frequently drop below 0°F (-18°C), especially at night. Bring a range of clothing options, including a warm jacket and rain gear, even in the summer.",
  name: "Yellowstone",
  designation: "National Park"
};

// -------------------------
// EXPORT STATIC FUNCTION
// -------------------------
export function getParkDataStatic() {
  return park;
}

// -------------------------
// API FETCHING SETUP
// -------------------------
const baseUrl = "https://developer.nps.gov/api/v1/";


// Generic fetch helper
async function fetchJson(endpoint) {
  try {
    const res = await fetch(baseUrl + endpoint, {
      headers: { "X-Api-Key": apiKey }
    });
    if (!res.ok) throw new Error(`API request failed: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching from NPS API:", error);
    return null;
  }
}

// -------------------------
// FETCH LIVE PARK DATA
// -------------------------
export async function getParkData(parkCode = "yell") {
  const data = await fetchJson(`parks?parkCode=${parkCode}`);
  if (data && data.data && data.data.length > 0) {
    return data.data[0]; // return first park object
  } else {
    console.warn("Falling back to static Yellowstone data");
    return park; // fallback
  }
}

