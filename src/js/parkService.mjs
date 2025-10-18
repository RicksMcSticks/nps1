const apiKey = import.meta.env.VITE_NPS_API_KEY;
const baseUrl = "https://developer.nps.gov/api/v1/";

// -------------------------
// STATIC PARK DATA (Fallback)
// -------------------------
const park = {
  id: "F58C6D24-8D10-4573-9826-65D42B8B83AD",
  url: "https://www.nps.gov/yell/index.htm",
  fullName: "Yellowstone National Park",
  parkCode: "yell",
  description: "On March 1, 1872, Yellowstone became the first national park...",
  latitude: "44.59824417",
  longitude: "-110.5471695",
  states: "ID,MT,WY",
  contacts: {
    phoneNumbers: [{ phoneNumber: "307-344-7381", type: "Voice" }],
    emailAddresses: [{ description: "General park info", emailAddress: "YELL_Information@nps.gov" }]
  },
  addresses: [
    { postalCode: "82190", city: "Yellowstone National Park", stateCode: "WY", line1: "2 Officers Row", type: "Physical", line2: "Yellowstone National Park Headquarters" },
    { postalCode: "82190-0168", city: "Yellowstone National Park", stateCode: "WY", line1: "PO Box 168", type: "Mailing" }
  ],
  images: [
    { url: "https://www.nps.gov/common/uploads/structured_data/3C7D5920-1DD8-B71B-0B83F012ED802CEA.jpg", altText: "Grand Prismatic Spring", caption: "Colorful hot spring" }
  ],
  weatherInfo: "Yellowstone's weather can vary...",
  name: "Yellowstone",
  designation: "National Park",
  directionsInfo: "Yellowstone has multiple entrances...",
  directionsUrl: "http://www.nps.gov/yell/planyourvisit/directions.htm",
  activities: [{ name: "Hiking" }, { name: "Camping" }]
};

// -------------------------
// STATIC EXPORT
// -------------------------
export function getParkDataStatic() {
  return park;
}

// -------------------------
// HELPER FETCH FUNCTION
// -------------------------
async function fetchJson(endpoint) {
  try {
    const res = await fetch(baseUrl + endpoint, { headers: { "X-Api-Key": apiKey } });
    if (!res.ok) throw new Error(`API request failed: ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// -------------------------
// FETCH LIVE DATA
// -------------------------
export async function getParkData(parkCode = "yell") {
  const data = await fetchJson(`parks?parkCode=${parkCode}`);
  return data?.data?.[0] || park;
}

export async function getParkAlerts(parkCode = "yell") {
  const data = await fetchJson(`alerts?parkCode=${parkCode}`);
  return data?.data || [];
}

export async function getVisitorCenterData(parkCode = "yell") {
  const data = await fetchJson(`visitorcenters?parkCode=${parkCode}`);
  return data?.data || [];
}

export function getInfoLinks(images) {
  return [
    { name: "Current Conditions ›", link: "conditions.html", image: images[2]?.url || "", description: "See what conditions to expect" },
    { name: "Fees and Passes ›", link: "fees.html", image: images[3]?.url || "", description: "Learn about fees" },
    { name: "Visitor Centers ›", link: "visitor_centers.html", image: images[9]?.url || "", description: "Learn about visitor centers" }
  ];
}
