const contact = {
  name: "Charles David Dirige",
  title: "Sales Consultant",
  phone: "+6309610334303",
  email: "dirigecharles26@gmail.com",
  url: "https://www.messenger.com/e2ee/t/25083185537963617",
  location: "BYD Cordon, Isabela",
  bio: "For BYD unit inquiries, assistance, and other concerns, kindly look for Charles David Dirige at BYD Cordon, Isabela. Feel free to reach out for assistance regarding BYD units, features, services, and other related inquiries.",
  socials: [
    { name: "Facebook", icon: "icons/fb.png", url: "https://www.facebook.com/charles.david.9404" },
    { name: "Instagram", icon: "icons/ig.png", url: "https://www.instagram.com/drg.chrls/" },
    { name: "TikTok", icon: "icons/tiktok.png", url: "https://www.tiktok.com/@charles.dirige" },
  ],
};

const toast = document.querySelector("#toast");
let toastTimeout;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

document.querySelector("#save-contact").addEventListener("click", () => {
  showToast("Contact file downloading. Open it from Downloads, then choose Add to Contacts.");
});

function renderContact() {
  const pageTitle = `${contact.name} — Digital Business Card`;

  document.title = pageTitle;
  document.querySelector("#page-description").content =
    `${contact.name}, ${contact.title}. Contact details and links.`;
  document.querySelector("#brand-link").setAttribute("aria-label", "BYD Business card");
  document.querySelector("#profile-photo").alt = `Portrait of ${contact.name}`;
  document.querySelector("#profile-eyebrow").textContent = contact.location;
  document.querySelector("#profile-name").textContent = contact.name;
  document.querySelector("#profile-title").textContent = contact.title;

  const bio = document.querySelector("#profile-bio");
  bio.textContent = contact.bio;
  bio.hidden = !contact.bio.trim();

  const phoneUrl = `tel:${contact.phone.replace(/[^\d+]/g, "")}`;
  const emailUrl = `mailto:${contact.email}`;
  document.querySelector("#call-action").href = phoneUrl;
  document.querySelector("#message-action").href = `sms:${contact.phone.replace(/[^\d+]/g, "")}`;
  document.querySelector("#email-action").href = emailUrl;
  document.querySelector("#location-action").href =
    `https://maps.google.com/?q=${encodeURIComponent(contact.location)}`;
  document.querySelector("#email-detail").href = emailUrl;
  document.querySelector("#email-text").textContent = contact.email;
  document.querySelector("#phone-detail").href = phoneUrl;
  document.querySelector("#phone-text").textContent = contact.phone;
  const socialSection = document.querySelector("#social-section");
  const socialLinks = document.querySelector("#social-links");
  socialLinks.replaceChildren();
  for (const social of contact.socials) {
    const link = document.createElement("a");
    link.href = social.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.setAttribute("aria-label", social.name);
    let icon;
    if (/\.(svg|png|jpe?g|webp|gif)$/i.test(social.icon)) {
      icon = document.createElement("img");
      icon.className = "social-image";
      icon.src = social.icon;
      icon.alt = "";
    } else {
      icon = document.createElement("span");
      icon.className = "social-mark";
      icon.textContent = social.icon;
    }
    icon.setAttribute("aria-hidden", "true");
    const label = document.createElement("span");
    label.textContent = social.name;
    link.append(icon, label);
    socialLinks.append(link);
  }
  socialSection.hidden = contact.socials.length === 0;
}

document.querySelector("#share-button").addEventListener("click", async () => {
  const shareData = {
    title: `${contact.name} — Digital Business Card`,
    text: `Connect with ${contact.name}, ${contact.title}.`,
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }

    await navigator.clipboard.writeText(shareData.url);
    showToast("Card link copied to clipboard.");
  } catch (error) {
    if (error.name === "AbortError") return;

    showToast("Unable to share this card. Please copy the page link.");
  }
});

const coffeeToggle = document.querySelector("#coffee-toggle");
const coffeeDetails = document.querySelector("#coffee-details");
coffeeToggle.addEventListener("click", () => {
  const isExpanded = coffeeToggle.getAttribute("aria-expanded") === "true";
  coffeeToggle.setAttribute("aria-expanded", String(!isExpanded));
  coffeeDetails.hidden = isExpanded;
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
renderContact();
