const STATE_MACHINE_PORT = "5001";
const COMPOUND_DETECTION_PORT = "5002";
const MASS_CALIBRATION_PORT = "5003";
const CONCENTRATION_PORT = "5004";
const SINGLE_ION_PORT = "5005";
const TRANSCAL_PORT = "5006"; //eslint-disable-line
const SEQUENCING_PORT = "5007"; //eslint-disable-line
const MPXVALVE_PORT = "5008"; //eslint-disable-line
const RANALYSIS_PORT = "5009"; //eslint-disable-line
const BREATH_INLET_PORT = "5010";
const GC_PORT = "5011"; //eslint-disable-line
const CHROMQUANT_PORT = "5012"; //eslint-disable-line
const TOOLS_PORT = "5013";
const CLIENT_PORT = "5014"; //eslint-disable-line
const MOBILE_PORT = "5015"; //eslint-disable-line
const MS_PORT = "5016";
const IMS_PORT = "5017"; //eslint-disable-line
const LCS_PORT = "5018"; //eslint-disable-line
const REPLAY_PORT = "5019"; //eslint-disable-line
const THUNER_PORT = "5020"; //eslint-disable-line
const FINGERPRINTING_PORT = "5021"; //eslint-disable-line
const CTCAUTOSAMPLER_PORT = "5022"; //eslint-disable-line
const MFC_OFFSET_PORT = "5023"; //eslint-disable-line
const BUNDLER_PORT = "5024"; //eslint-disable-line

const API_VERSION = "v8";

// === PRODUCTION ADDRESS ===
const ORIGIN_URL = window.location.origin;
// === DEVELOPMENT IPs ====
// const ORIGIN_URL = "http://192.168.1.41"; // ftof
// const ORIGIN_URL = "http://192.168.1.8";
// const ORIGIN_URL = "http://192.168.1.75";
// const ORIGIN_URL = "http://192.168.1.22"; // eitof-012
// const ORIGIN_URL = "http://192.168.1.119"; // ACSM-041 Thun
// const ORIGIN_URL = "http://192.168.1.24"; //c4q-101
// const ORIGIN_URL = "http://172.16.16.202"; // c4q-142
// const ORIGIN_URL = "http://192.168.1.91"; // 493mini

let lastIndex = ORIGIN_URL.lastIndexOf(":");

export const ROOT_URL =
  lastIndex > 5 ? ORIGIN_URL.slice(0, ORIGIN_URL.lastIndexOf(":")) : ORIGIN_URL;

export const STATE_MACHINE_ROOT_URL = `${ROOT_URL}:${STATE_MACHINE_PORT}`;
export const STATE_MACHINE_SERVICE_URL = `${STATE_MACHINE_ROOT_URL}/acquility/api/system_control/${API_VERSION}`;

export const COMPOUND_DETECTION_ROOT_URL = `${ROOT_URL}:${COMPOUND_DETECTION_PORT}`;
export const COMPOUND_DETECTION_SERVICE_URL = `${COMPOUND_DETECTION_ROOT_URL}/acquility/api/compound_detection/${API_VERSION}`;

export const MASS_CALIBRATION_ROOT_URL = `${ROOT_URL}:${MASS_CALIBRATION_PORT}`;
export const MASS_CALIBRATION_SERVICE_URL = `${MASS_CALIBRATION_ROOT_URL}/acquility/api/mass_calibration/${API_VERSION}`;

export const CONCENTRATION_ROOT_URL = `${ROOT_URL}:${CONCENTRATION_PORT}`;
export const CONCENTRATION_SERVICE_URL = `${CONCENTRATION_ROOT_URL}/acquility/api/concentration/${API_VERSION}`;

export const SINGLE_ION_ROOT_URL = `${ROOT_URL}:${SINGLE_ION_PORT}`;
export const SINGLE_ION_SERVICE_URL = `${SINGLE_ION_ROOT_URL}/acquility/api/single_ion/${API_VERSION}`;

export const TOOLS_ROOT_URL = `${ROOT_URL}:${TOOLS_PORT}`;
export const TOOLS_SERVICE_URL = `${TOOLS_ROOT_URL}/acquility/api/tools/${API_VERSION}`;

export const BREATH_INLET_ROOT_URL = `${ROOT_URL}:${BREATH_INLET_PORT}`;
export const BREATH_INLET_SERVICE_URL = `${BREATH_INLET_ROOT_URL}/acquility/api/breath_inlet/${API_VERSION}`;

export const MS_ROOT_URL = `${ROOT_URL}:${MS_PORT}`;

export const REPLAY_ROOT_URL = `${ROOT_URL}:${REPLAY_PORT}`;
export const REPLAY_SERVICE_URL = `${REPLAY_ROOT_URL}/acquility/api/replay/${API_VERSION}`;

export const BUNDLER_ROOT_URL = `${ROOT_URL}:${BUNDLER_PORT}`;
export const BUNDLER_SERVICE_URL = `${BUNDLER_ROOT_URL}/acquility/api/bundler/${API_VERSION}`;
