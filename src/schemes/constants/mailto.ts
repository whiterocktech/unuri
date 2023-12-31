import { merge, subExp } from '../../util'

const isIRI = true

// RFC 3986
const UNRESERVED$$ = `[A-Za-z0-9\\-\\.\\_\\~${isIRI ? '\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF' : ''}]`
const HEXDIG$$ = '[0-9A-Fa-f]' // case-insensitive
const PCT_ENCODED$ = subExp(`${subExp(`%[EFef]${HEXDIG$$}%${HEXDIG$$}${HEXDIG$$}%${HEXDIG$$}${HEXDIG$$}`)}|${subExp(`%[89A-Fa-f]${HEXDIG$$}%${HEXDIG$$}${HEXDIG$$}`)}|${subExp(`%${HEXDIG$$}${HEXDIG$$}`)}`) // expanded

// RFC 5322, except these symbols as per RFC 6068: @ : / ? # [ ] & ; =
// const ATEXT$$ = "[A-Za-z0-9\\!\\#\\$\\%\\&\\'\\*\\+\\-\\/\\=\\?\\^\\_\\`\\{\\|\\}\\~]";
// const WSP$$ = "[\\x20\\x09]";
// const OBS_QTEXT$$ = "[\\x01-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]";  //(%d1-8 / %d11-12 / %d14-31 / %d127)
// const QTEXT$$ = merge("[\\x21\\x23-\\x5B\\x5D-\\x7E]", OBS_QTEXT$$);  //%d33 / %d35-91 / %d93-126 / obs-qtext
// const VCHAR$$ = "[\\x21-\\x7E]";
// const WSP$$ = "[\\x20\\x09]";
// const OBS_QP$ = subExp("\\\\" + merge("[\\x00\\x0D\\x0A]", OBS_QTEXT$$));  //%d0 / CR / LF / obs-qtext
// const FWS$ = subExp(subExp(WSP$$ + "*" + "\\x0D\\x0A") + "?" + WSP$$ + "+");
// const QUOTED_PAIR$ = subExp(subExp("\\\\" + subExp(VCHAR$$ + "|" + WSP$$)) + "|" + OBS_QP$);
// const QUOTED_STRING$ = subExp('\\"' + subExp(FWS$ + "?" + QCONTENT$) + "*" + FWS$ + "?" + '\\"');
const ATEXT$$ = '[A-Za-z0-9\\!\\$\\%\\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]'
const QTEXT$$ = '[\\!\\$\\%\\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]'
const VCHAR$$ = merge(QTEXT$$, '[\\"\\\\]')
// const DOT_ATOM_TEXT$ = subExp(`${ATEXT$$}+${subExp(`\\.${ATEXT$$}+`)}*`)
// const QUOTED_PAIR$ = subExp(`\\\\${VCHAR$$}`)
// const QCONTENT$ = subExp(`${QTEXT$$}|${QUOTED_PAIR$}`)
// const QUOTED_STRING$ = subExp(`\\"${QCONTENT$}*` + `\\"`)

// RFC 6068
// const DTEXT_NO_OBS$$ = '[\\x21-\\x5A\\x5E-\\x7E]' // %d33-90 / %d94-126
export const SOME_DELIMS$$ = '[\\!\\$\\\'\\(\\)\\*\\+\\,\\;\\:\\@]'
// const QCHAR$ = subExp(`${UNRESERVED$$}|${PCT_ENCODED$}|${SOME_DELIMS$$}`)
// const DOMAIN$ = subExp(`${DOT_ATOM_TEXT$}|` + `\\[${DTEXT_NO_OBS$$}*` + `\\]`)
// const LOCAL_PART$ = subExp(`${DOT_ATOM_TEXT$}|${QUOTED_STRING$}`)
// const ADDR_SPEC$ = subExp(`${LOCAL_PART$}\\@${DOMAIN$}`)
// const TO$ = subExp(`${ADDR_SPEC$ + subExp(`\\,${ADDR_SPEC$}`)}*`)
// const HFNAME$ = subExp(`${QCHAR$}*`)
// const HFVALUE$ = HFNAME$
// const HFIELD$ = subExp(`${HFNAME$}\\=${HFVALUE$}`)
// const HFIELDS2$ = subExp(`${HFIELD$ + subExp(`\\&${HFIELD$}`)}*`)
// const HFIELDS$ = subExp(`\\?${HFIELDS2$}`)
// const MAILTO_URI = new RegExp(`^mailto\\:${TO$}?${HFIELDS$}?$`)

export const UNRESERVED = new RegExp(UNRESERVED$$, 'g')
export const PCT_ENCODED = new RegExp(PCT_ENCODED$, 'g')
export const NOT_LOCAL_PART = new RegExp(merge('[^]', ATEXT$$, '[\\.]', '[\\"]', VCHAR$$), 'g')
// const NOT_DOMAIN = new RegExp(merge('[^]', ATEXT$$, '[\\.]', '[\\[]', DTEXT_NO_OBS$$, '[\\]]'), 'g')
export const NOT_HFNAME = new RegExp(merge('[^]', UNRESERVED$$, SOME_DELIMS$$), 'g')
export const NOT_HFVALUE = NOT_HFNAME
// const TO = new RegExp(`^${TO$}$`)
// const HFIELDS = new RegExp(`^${HFIELDS2$}$`)
