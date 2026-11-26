// Reicht Teslas Antwort an Tether weiter (keycard://anmeldung) und vergisst sie. Kein Server, nichts
// wird gespeichert oder anderswohin geschickt. Der Code allein nützt niemandem: Tether tauscht ihn
// nur zusammen mit Client-Secret und PKCE-Prüfwert, die beide den Mac nie verlassen.
(function () {
  var query = new URLSearchParams(location.search);
  var forward = new URLSearchParams();
  ["code", "state", "error"].forEach(function (name) {
    var value = query.get(name);
    if (value) forward.set(name, value);
  });
  history.replaceState(null, "", location.pathname);
  if (!forward.has("state")) return;

  var target = "keycard://anmeldung?" + forward.toString();
  var link = document.getElementById("open");
  link.href = target;
  link.hidden = false;
  document.getElementById("text").textContent = forward.has("error")
    ? "Tesla hat die Anmeldung nicht erlaubt. Tether zeigt die Einzelheiten."
    : "Angemeldet. Tether übernimmt. Falls nichts passiert:";
  location.href = target;
})();
