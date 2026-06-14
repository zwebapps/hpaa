/**
 * One-off helper: merge CSV stdin or embedded data vs excluded emails from old commented list.
 * Run: node scripts/filter-outreach-new.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const OLD_EMAILS = new Set(
  `
contact@anduril.com
verify@ga.com
pr@avinc.com
david.flack@kratosdefense.com
katherine.mauss@ngc.com
media.relations@lmco.com
media@boeing.com
corporatepr@rtx.com
eileen.lainez@l3harris.com
publicrelations@textronsystems.com
erecruiting@airbus.com
dataprotection@thalesgroup.com
leonardopressoffice@leonardo.com
presscentre@saabgroup.com
andrew.mcdowell3@baesystems.com
joachim.schranzhofer@hensoldt.net
media@shield.ai
corporate.pr@elbitsystems.com
press@elroyair.com
press@auterion.com
communications@helsing.ai
brandon.p.vervelde@leidos.com
media@peraton.com
media@tekever.com
pstrobel@quantum-systems.com
press@destinus.com
info@darkmatterlabs.org
press@dronamics.com
media@redcat.red
mediainfo@gd-ms.com
lucie.baton@safrangroup.com
support@atlasdynamics.eu
osd.pa.dutyofficer@mail.mil
media@darpa.mil
info@diu.mil
info@eda.europa.eu
press@hq.nato.int
jesper.lov@maersk.com
groupmediauk@shell.com
`
    .split(/\n/)
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean),
);

const CSV = `company_name,country,website,contact_email
Anduril Industries,USA,https://www.anduril.com,contact@anduril.com
General Atomics Aeronautical Systems,USA,https://www.ga-asi.com,verify@ga.com
AeroVironment,USA,https://www.avinc.com,pr@avinc.com
Kratos Defense,USA,https://www.kratosdefense.com,david.flack@kratosdefense.com
Northrop Grumman,USA,https://www.northropgrumman.com,Katherine.Mauss@ngc.com
Lockheed Martin,USA,https://www.lockheedmartin.com,media.relations@lmco.com
Boeing Defense,USA,https://www.boeing.com,media@boeing.com
Raytheon Technologies (RTX),USA,https://www.rtx.com,corporatepr@rtx.com
L3Harris Technologies,USA,https://www.l3harris.com,Eileen.Lainez@L3Harris.com
Textron Systems,USA,https://www.textronsystems.com,publicrelations@textronsystems.com
Airbus Defence & Space,EU,https://www.airbus.com,media.airbusdefenceandspace@airbus.com
Thales Group,France,https://www.thalesgroup.com,camille.heck@thalesgroup.com
Leonardo S.p.A,Italy,https://www.leonardo.com,leonardopressoffice@leonardo.com
Saab,Sweden,https://www.saab.com,presscentre@saabgroup.com
BAE Systems,UK,https://www.baesystems.com,andrew.mcdowell3@baesystems.com
Rheinmetall,Germany,https://www.rheinmetall.com,oliver.hoffmann@rheinmetall.com
Dassault Aviation,France,https://www.dassault-aviation.com,contact@dassault-aviation.com
Indra Sistemas,Spain,https://www.indracompany.com,indra@indracompany.com
Hensoldt,Germany,https://www.hensoldt.net,joachim.schranzhofer@hensoldt.net
QinetiQ,UK,https://www.qinetiq.com,media@qinetiq.com
Shield AI,USA,https://shield.ai,media@shield.ai
Skydio,USA,https://www.skydio.com,press@skydio.com
Teledyne FLIR,USA,https://www.teledyne.com,info@flir.com
Elbit Systems,Israel,https://www.elbitsystems.com,Corporate.PR@elbitsystems.com
Israel Aerospace Industries (IAI),Israel,https://www.iai.co.il,corpmkg@iai.co.il
BlueBird Aero Systems,Israel,https://www.bluebird-uav.com,info@bluebird-uav.com
Elroy Air,USA,https://elroyair.com,press@elroyair.com
Zipline,USA,https://www.flyzipline.com,press@flyzipline.com
Auterion,Switzerland,https://auterion.com,press@auterion.com
Helsing AI,Germany,https://helsing.ai,communications@helsing.ai
MAG Aerospace,USA,https://www.magaero.com,Brian.Stenson@mag.us
Sierra Nevada Corporation,USA,https://www.sncorp.com,comms@sncorp.com
AEVEX Aerospace,USA,https://www.aevex.com,info@aevex.com
Leidos,USA,https://www.leidos.com,brandon.p.vervelde@leidos.com
Booz Allen Hamilton,USA,https://www.boozallen.com,info@boozallen.com
SAIC,USA,https://www.saic.com,publicrelations@saic.com
Parsons Corporation,USA,https://www.parsons.com,Dave.Spille@parsons.com
Jacobs (Engineering Defense),USA,https://www.jacobs.com,media@jacobs.com
Peraton,USA,https://www.peraton.com,media@peraton.com
CACI International,USA,https://www.caci.com,lauren.presti@caci.com
Tekever,Portugal,https://www.tekever.com,media@tekever.com
Quantum Systems,Germany,https://quantum-systems.com,pstrobel@quantum-systems.com
Destinus,Switzerland,https://destinus.com,press@destinus.com
Stark Defence,Germany,https://www.stark-defence.de,media@stark-defence.com
Flyby Robotics,EU,https://www.flybyrobotics.com,nathan@flybydev.com
ARX Robotics,Germany,https://arx.group,info@arx-robotics.com
Mistral AI,France,https://mistral.ai,press@mistral.ai
Dark Matter Labs,EU,https://darkmatterlabs.org,info@darkmatterlabs.org
Dronamics,Bulgaria,https://www.dronamics.com,press@dronamics.com
Parrot,France,https://www.parrot.com,pr@parrot.com
Delair,France,https://www.delair.aero,contact@delair.aero
BRINC,USA,https://www.brincdrones.com,contact@brincdrones.com
Teal Drones,USA,https://tealdrones.com,media@redcat.red
Red Cat Holdings,USA,https://www.redcatredcat.com,media@redcat.red
BlueHalo,USA,https://www.bluehalollc.com,Info@BlueHalo.com
Dynetics,USA,https://www.dynetics.com,Kristina.hendrix@dynetics.com
General Dynamics Mission Systems,USA,https://gdmissionsystems.com,mediainfo@gd-ms.com
Collins Aerospace,USA,https://www.collinsaerospace.com,corporatepr@rtx.com
Safran,France,https://www.safran-group.com,lucie.baton@safrangroup.com
MBDA,EU,https://www.mbda-systems.com,Guenter.Abel@mbda-systems.de
Malloy Aeronautics,UK,https://www.malloyaeronautics.com,enquiries@malloyaeronautics.com
Atlas UAS,Ireland,https://atlasuas.com,support@atlasdynamics.eu
U.S. Department of Defense,USA,https://www.defense.gov,osd.pa.dutyofficer@mail.mil
DARPA,USA,https://www.darpa.mil,media@darpa.mil
DIU (Defense Innovation Unit),USA,https://www.diu.mil,info@diu.mil
U.S. Army Futures Command,USA,https://www.army.mil/futures,afcmedia@mail.mil
U.S. Air Force Research Laboratory,USA,https://www.afresearchlab.com,afrl.pa.inquiry@us.af.mil
U.S. Navy NAVAIR,USA,https://www.navair.navy.mil,navairpao@us.navy.mil
DHS (Border Security),USA,https://www.dhs.gov,MediaInquiry@hq.dhs.gov
European Defence Agency (EDA),EU,https://eda.europa.eu,info@eda.europa.eu
NATO Support & Procurement Agency (NSPA),NATO,https://www.nspa.nato.int,Denisa.pais@nspa.nato.int
Bundeswehr Procurement Office (BAAINBw),Germany,https://www.bundeswehr.de,info@bundeswehr.de
French DGA,France,https://www.defense.gouv.fr/dga,dga.presse.fct@def.gouv.fr
UK MoD Defence Equipment & Support (DE&S),UK,https://www.gov.uk/government/organisations/defence-equipment-and-support,dessec-parliamentarybusiness@mod.gov.uk
Italian Ministry of Defence,Italy,https://www.difesa.it,aid@aid.difesa.it
Spanish MOD,Spain,https://www.defensa.gob.es,prensa@et.mde.es
Dutch Defence Materiel Organisation,Netherlands,https://www.defensie.nl,persvoorlichting@mindef.nl
Swedish FMV (Defence Procurement),Sweden,https://www.fmv.se,registrator@fmv.se
Polish Armament Agency,Poland,https://www.gov.pl/web/national-defence/agencja-uzbrojenia,newsroom@mon.gov.pl
DHL,Germany,https://www.dhl.com,press@dpdhl.com
Airbus Helicopters,EU,https://www.airbus.com/en/helicopters,media.airbusdefenceandspace@airbus.com
Boeing Autonomous Systems,USA,https://www.boeing.com,media@boeing.com
Amazon Prime Air,USA,https://www.amazon.com/Amazon-Prime-Air,pressoffice@amazon.com
Maersk,Denmark,https://www.maersk.com,jesper.lov@maersk.com
Shell Energy,UK/NL,https://www.shell.com,GroupMediaUK@shell.com
BP,UK,https://www.bp.com,uspress@bp.com
NATO Allied Command Transformation,NATO,https://www.act.nato.int,pao@act.nato.int
UN World Food Programme,International,https://www.wfp.org,wfp.media@wfp.org`;

function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function parseCsv(text) {
  const lines = text.trim().split("\n");
  const out = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const lastComma = line.lastIndexOf(",");
    const email = line.slice(lastComma + 1).trim();
    const rest = line.slice(0, lastComma);
    const m = rest.match(/^(.*),([^,]+),(https?:\/\/[^,]+)$/);
    if (!m) {
      console.error("Bad line:", line);
      continue;
    }
    const company = m[1].trim();
    const country = m[2].trim();
    const website = m[3].trim();
    out.push({ company, country, website, email });
  }
  return out;
}

const rows = parseCsv(CSV);
const seen = new Set();
const recipients = [];
for (const r of rows) {
  const em = r.email.toLowerCase();
  if (OLD_EMAILS.has(em)) continue;
  if (seen.has(em)) continue;
  seen.add(em);
  recipients.push({
    id: slugify(r.company),
    name: r.company,
    email: r.email,
    country: r.country,
    website: r.website,
  });
}

const finalPath = path.join(__dirname, "..", "marketing", "data", "outreach-recipients.json");
let merged = recipients;
try {
  const prev = JSON.parse(fs.readFileSync(finalPath, "utf8"));
  const first = prev.recipients?.[0];
  if (first?.id === "zahoorAhmed" && first?.email) {
    merged = [first, ...recipients];
  }
} catch {
  /* no previous file or invalid JSON */
}

fs.writeFileSync(finalPath, JSON.stringify({ recipients: merged }, null, 2), "utf8");
console.log(
  "Wrote",
  merged.length,
  "rows to",
  path.relative(path.join(__dirname, ".."), finalPath),
  "(",
  recipients.length,
  "filtered new +",
  merged.length - recipients.length,
  "preserved test row)",
);
