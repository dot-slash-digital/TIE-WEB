const FORM = document.getElementById("contact-form");
const STATUS = document.getElementById("form-status");
const SUBMIT_BUTTON = FORM.querySelector("button[type='submit']");

const setStatus = (message, isError) => {
  STATUS.textContent = message;
  STATUS.classList.toggle("error", !!isError);
  STATUS.classList.toggle("success", !isError && !!message);
};

FORM.addEventListener("submit", async (event) => {
  event.preventDefault();

  SUBMIT_BUTTON.disabled = true;
  setStatus("Sending...", false);

  try {
    const response = await fetch(FORM.action, {
      method: FORM.method,
      body: new FormData(FORM),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      setStatus("Thanks! Your message has been sent.", false);
      FORM.reset();
    } else {
      const data = await response.json().catch(() => null);
      const message = data?.errors
        ?.map((error) => error.message)
        .join(", ");
      setStatus(message || "Something went wrong. Please try again.", true);
    }
  } catch {
    setStatus("Something went wrong. Please try again.", true);
  } finally {
    SUBMIT_BUTTON.disabled = false;
  }
});
