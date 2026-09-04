/**
 * Grade Motion - Universal Searchable Country Code Picker
 * Lightweight, zero-dependency, PageSpeed-optimized (vanilla JS)
 */
(function() {
    const COUNTRIES = [{"name":"Afghanistan","code":"+93","iso":"AF","flag":"🇦🇫"},{"name":"Albania","code":"+355","iso":"AL","flag":"🇦🇱"},{"name":"Algeria","code":"+213","iso":"DZ","flag":"🇩🇿"},{"name":"American Samoa","code":"+1684","iso":"AS","flag":"🇦🇸"},{"name":"Andorra","code":"+376","iso":"AD","flag":"🇦🇩"},{"name":"Angola","code":"+244","iso":"AO","flag":"🇦🇴"},{"name":"Anguilla","code":"+1264","iso":"AI","flag":"🇦🇮"},{"name":"Antigua and Barbuda","code":"+1268","iso":"AG","flag":"🇦🇬"},{"name":"Argentina","code":"+54","iso":"AR","flag":"🇦🇷"},{"name":"Armenia","code":"+374","iso":"AM","flag":"🇦🇲"},{"name":"Aruba","code":"+297","iso":"AW","flag":"🇦🇼"},{"name":"Australia","code":"+61","iso":"AU","flag":"🇦🇺"},{"name":"Austria","code":"+43","iso":"AT","flag":"🇦🇹"},{"name":"Azerbaijan","code":"+994","iso":"AZ","flag":"🇦🇿"},{"name":"Bahamas","code":"+1242","iso":"BS","flag":"🇧🇸"},{"name":"Bahrain","code":"+973","iso":"BH","flag":"🇧🇭"},{"name":"Bangladesh","code":"+880","iso":"BD","flag":"🇧🇩"},{"name":"Barbados","code":"+1246","iso":"BB","flag":"🇧🇧"},{"name":"Belarus","code":"+375","iso":"BY","flag":"🇧🇾"},{"name":"Belgium","code":"+32","iso":"BE","flag":"🇧🇪"},{"name":"Belize","code":"+501","iso":"BZ","flag":"🇧🇿"},{"name":"Benin","code":"+229","iso":"BJ","flag":"🇧🇯"},{"name":"Bermuda","code":"+1441","iso":"BM","flag":"🇧🇲"},{"name":"Bhutan","code":"+975","iso":"BT","flag":"🇧🇹"},{"name":"Bolivia","code":"+591","iso":"BO","flag":"🇧🇴"},{"name":"Bosnia and Herzegovina","code":"+387","iso":"BA","flag":"🇧🇦"},{"name":"Botswana","code":"+267","iso":"BW","flag":"🇧🇼"},{"name":"Brazil","code":"+55","iso":"BR","flag":"🇧🇷"},{"name":"British Virgin Islands","code":"+1284","iso":"VG","flag":"🇻🇬"},{"name":"Brunei","code":"+673","iso":"BN","flag":"🇧🇳"},{"name":"Bulgaria","code":"+359","iso":"BG","flag":"🇧🇬"},{"name":"Burkina Faso","code":"+226","iso":"BF","flag":"🇧🇫"},{"name":"Burundi","code":"+257","iso":"BI","flag":"🇧🇮"},{"name":"Cambodia","code":"+855","iso":"KH","flag":"🇰🇭"},{"name":"Cameroon","code":"+237","iso":"CM","flag":"🇨🇲"},{"name":"Canada","code":"+1","iso":"CA","flag":"🇨🇦"},{"name":"Cape Verde","code":"+238","iso":"CV","flag":"🇨🇻"},{"name":"Cayman Islands","code":"+1345","iso":"KY","flag":"🇰🇾"},{"name":"Central African Republic","code":"+236","iso":"CF","flag":"🇨🇫"},{"name":"Chad","code":"+235","iso":"TD","flag":"🇹🇩"},{"name":"Chile","code":"+56","iso":"CL","flag":"🇨🇱"},{"name":"China","code":"+86","iso":"CN","flag":"🇨🇳"},{"name":"Colombia","code":"+57","iso":"CO","flag":"🇨🇴"},{"name":"Comoros","code":"+269","iso":"KM","flag":"🇰🇲"},{"name":"Congo (Brazzaville)","code":"+242","iso":"CG","flag":"🇨🇬"},{"name":"Congo (DRC)","code":"+243","iso":"CD","flag":"🇨🇩"},{"name":"Cook Islands","code":"+682","iso":"CK","flag":"🇨🇰"},{"name":"Costa Rica","code":"+506","iso":"CR","flag":"🇨🇷"},{"name":"Cote d'Ivoire","code":"+225","iso":"CI","flag":"🇨🇮"},{"name":"Croatia","code":"+385","iso":"HR","flag":"🇭🇷"},{"name":"Cuba","code":"+53","iso":"CU","flag":"🇨🇺"},{"name":"Curacao","code":"+599","iso":"CW","flag":"🇨🇼"},{"name":"Cyprus","code":"+357","iso":"CY","flag":"🇨🇾"},{"name":"Czech Republic","code":"+420","iso":"CZ","flag":"🇨🇿"},{"name":"Denmark","code":"+45","iso":"DK","flag":"🇩🇰"},{"name":"Djibouti","code":"+253","iso":"DJ","flag":"🇩🇯"},{"name":"Dominica","code":"+1767","iso":"DM","flag":"🇩🇲"},{"name":"Dominican Republic","code":"+1809","iso":"DO","flag":"🇩🇴"},{"name":"Ecuador","code":"+593","iso":"EC","flag":"🇪🇨"},{"name":"Egypt","code":"+20","iso":"EG","flag":"🇪🇬"},{"name":"El Salvador","code":"+503","iso":"SV","flag":"🇸🇻"},{"name":"Equatorial Guinea","code":"+240","iso":"GQ","flag":"🇬🇶"},{"name":"Eritrea","code":"+291","iso":"ER","flag":"🇪🇷"},{"name":"Estonia","code":"+372","iso":"EE","flag":"🇪🇪"},{"name":"Eswatini","code":"+268","iso":"SZ","flag":"🇸🇿"},{"name":"Ethiopia","code":"+251","iso":"ET","flag":"🇪🇹"},{"name":"Falkland Islands","code":"+500","iso":"FK","flag":"🇫🇰"},{"name":"Faroe Islands","code":"+298","iso":"FO","flag":"🇫🇴"},{"name":"Fiji","code":"+679","iso":"FJ","flag":"🇫🇯"},{"name":"Finland","code":"+358","iso":"FI","flag":"🇫🇮"},{"name":"France","code":"+33","iso":"FR","flag":"🇫🇷"},{"name":"French Guiana","code":"+594","iso":"GF","flag":"🇬🇫"},{"name":"French Polynesia","code":"+689","iso":"PF","flag":"🇵🇫"},{"name":"Gabon","code":"+241","iso":"GA","flag":"🇬🇦"},{"name":"Gambia","code":"+220","iso":"GM","flag":"🇬🇲"},{"name":"Georgia","code":"+995","iso":"GE","flag":"🇬🇪"},{"name":"Germany","code":"+49","iso":"DE","flag":"🇩🇪"},{"name":"Ghana","code":"+233","iso":"GH","flag":"🇬🇭"},{"name":"Gibraltar","code":"+350","iso":"GI","flag":"🇬🇮"},{"name":"Greece","code":"+30","iso":"GR","flag":"🇬🇷"},{"name":"Greenland","code":"+299","iso":"GL","flag":"🇬🇱"},{"name":"Grenada","code":"+1473","iso":"GD","flag":"🇬🇩"},{"name":"Guadeloupe","code":"+590","iso":"GP","flag":"🇬🇵"},{"name":"Guam","code":"+1671","iso":"GU","flag":"🇬🇺"},{"name":"Guatemala","code":"+502","iso":"GT","flag":"🇬🇹"},{"name":"Guernsey","code":"+44","iso":"GG","flag":"🇬🇬"},{"name":"Guinea","code":"+224","iso":"GN","flag":"🇬🇳"},{"name":"Guinea-Bissau","code":"+245","iso":"GW","flag":"🇬🇼"},{"name":"Guyana","code":"+592","iso":"GY","flag":"🇬🇾"},{"name":"Haiti","code":"+509","iso":"HT","flag":"🇭🇹"},{"name":"Honduras","code":"+504","iso":"HN","flag":"🇭🇳"},{"name":"Hong Kong","code":"+852","iso":"HK","flag":"🇭🇰"},{"name":"Hungary","code":"+36","iso":"HU","flag":"🇭🇺"},{"name":"Iceland","code":"+354","iso":"IS","flag":"🇮🇸"},{"name":"India","code":"+91","iso":"IN","flag":"🇮🇳"},{"name":"Indonesia","code":"+62","iso":"ID","flag":"🇮🇩"},{"name":"Iran","code":"+98","iso":"IR","flag":"🇮🇷"},{"name":"Iraq","code":"+964","iso":"IQ","flag":"🇮🇶"},{"name":"Ireland","code":"+353","iso":"IE","flag":"🇮🇪"},{"name":"Isle of Man","code":"+44","iso":"IM","flag":"🇮🇲"},{"name":"Israel","code":"+972","iso":"IL","flag":"🇮🇱"},{"name":"Italy","code":"+39","iso":"IT","flag":"🇮🇹"},{"name":"Jamaica","code":"+1876","iso":"JM","flag":"🇯🇲"},{"name":"Japan","code":"+81","iso":"JP","flag":"🇯🇵"},{"name":"Jersey","code":"+44","iso":"JE","flag":"🇯🇪"},{"name":"Jordan","code":"+962","iso":"JO","flag":"🇯🇴"},{"name":"Kazakhstan","code":"+7","iso":"KZ","flag":"🇰🇿"},{"name":"Kenya","code":"+254","iso":"KE","flag":"🇰🇪"},{"name":"Kiribati","code":"+686","iso":"KI","flag":"🇰🇮"},{"name":"Kosovo","code":"+383","iso":"XK","flag":"🇽🇰"},{"name":"Kuwait","code":"+965","iso":"KW","flag":"🇰🇼"},{"name":"Kyrgyzstan","code":"+996","iso":"KG","flag":"🇰🇬"},{"name":"Laos","code":"+856","iso":"LA","flag":"🇱🇦"},{"name":"Latvia","code":"+371","iso":"LV","flag":"🇱🇻"},{"name":"Lebanon","code":"+961","iso":"LB","flag":"🇱🇧"},{"name":"Lesotho","code":"+266","iso":"LS","flag":"🇱🇸"},{"name":"Liberia","code":"+231","iso":"LR","flag":"🇱🇷"},{"name":"Libya","code":"+218","iso":"LY","flag":"🇱🇾"},{"name":"Liechtenstein","code":"+423","iso":"LI","flag":"🇱🇮"},{"name":"Lithuania","code":"+370","iso":"LT","flag":"🇱🇹"},{"name":"Luxembourg","code":"+352","iso":"LU","flag":"🇱🇺"},{"name":"Macau","code":"+853","iso":"MO","flag":"🇲🇴"},{"name":"Madagascar","code":"+261","iso":"MG","flag":"🇲🇬"},{"name":"Malawi","code":"+265","iso":"MW","flag":"🇲🇼"},{"name":"Malaysia","code":"+60","iso":"MY","flag":"🇲🇾"},{"name":"Maldives","code":"+960","iso":"MV","flag":"🇲🇻"},{"name":"Mali","code":"+223","iso":"ML","flag":"🇲🇱"},{"name":"Malta","code":"+356","iso":"MT","flag":"🇲🇹"},{"name":"Marshall Islands","code":"+692","iso":"MH","flag":"🇲🇭"},{"name":"Martinique","code":"+596","iso":"MQ","flag":"🇲🇶"},{"name":"Mauritania","code":"+222","iso":"MR","flag":"🇲🇷"},{"name":"Mauritius","code":"+230","iso":"MU","flag":"🇲🇺"},{"name":"Mayotte","code":"+262","iso":"YT","flag":"🇾🇹"},{"name":"Mexico","code":"+52","iso":"MX","flag":"🇲🇽"},{"name":"Micronesia","code":"+691","iso":"FM","flag":"🇫🇲"},{"name":"Moldova","code":"+373","iso":"MD","flag":"🇲🇩"},{"name":"Monaco","code":"+377","iso":"MC","flag":"🇲🇨"},{"name":"Mongolia","code":"+976","iso":"MN","flag":"🇲🇳"},{"name":"Montenegro","code":"+382","iso":"ME","flag":"🇲🇪"},{"name":"Montserrat","code":"+1664","iso":"MS","flag":"🇲🇸"},{"name":"Morocco","code":"+212","iso":"MA","flag":"🇲🇦"},{"name":"Mozambique","code":"+258","iso":"MZ","flag":"🇲🇿"},{"name":"Myanmar","code":"+95","iso":"MM","flag":"🇲🇲"},{"name":"Namibia","code":"+264","iso":"NA","flag":"🇳🇦"},{"name":"Nauru","code":"+674","iso":"NR","flag":"🇳🇷"},{"name":"Nepal","code":"+977","iso":"NP","flag":"🇳🇵"},{"name":"Netherlands","code":"+31","iso":"NL","flag":"🇳🇱"},{"name":"New Caledonia","code":"+687","iso":"NC","flag":"🇳🇨"},{"name":"New Zealand","code":"+64","iso":"NZ","flag":"🇳🇿"},{"name":"Nicaragua","code":"+505","iso":"NI","flag":"🇳🇮"},{"name":"Niger","code":"+227","iso":"NE","flag":"🇳🇪"},{"name":"Nigeria","code":"+234","iso":"NG","flag":"🇳🇬"},{"name":"North Macedonia","code":"+389","iso":"MK","flag":"🇲🇰"},{"name":"Northern Mariana Islands","code":"+1670","iso":"MP","flag":"🇲🇵"},{"name":"Norway","code":"+47","iso":"NO","flag":"🇳🇴"},{"name":"Oman","code":"+968","iso":"OM","flag":"🇴🇲"},{"name":"Pakistan","code":"+92","iso":"PK","flag":"🇵🇰"},{"name":"Palau","code":"+680","iso":"PW","flag":"🇵🇼"},{"name":"Palestine","code":"+970","iso":"PS","flag":"🇵🇸"},{"name":"Panama","code":"+507","iso":"PA","flag":"🇵🇦"},{"name":"Papua New Guinea","code":"+675","iso":"PG","flag":"🇵🇬"},{"name":"Paraguay","code":"+595","iso":"PY","flag":"🇵🇾"},{"name":"Peru","code":"+51","iso":"PE","flag":"🇵🇪"},{"name":"Philippines","code":"+63","iso":"PH","flag":"🇵🇭"},{"name":"Poland","code":"+48","iso":"PL","flag":"🇵🇱"},{"name":"Portugal","code":"+351","iso":"PT","flag":"🇵🇹"},{"name":"Puerto Rico","code":"+1787","iso":"PR","flag":"🇵🇷"},{"name":"Qatar","code":"+974","iso":"QA","flag":"🇶🇦"},{"name":"Reunion","code":"+262","iso":"RE","flag":"🇷🇪"},{"name":"Romania","code":"+40","iso":"RO","flag":"🇷🇴"},{"name":"Russia","code":"+7","iso":"RU","flag":"🇷🇺"},{"name":"Rwanda","code":"+250","iso":"RW","flag":"🇷🇼"},{"name":"Saint Barthelemy","code":"+590","iso":"BL","flag":"🇧🇱"},{"name":"Saint Helena","code":"+290","iso":"SH","flag":"🇸🇭"},{"name":"Saint Kitts and Nevis","code":"+1869","iso":"KN","flag":"🇰🇳"},{"name":"Saint Lucia","code":"+1758","iso":"LC","flag":"🇱🇨"},{"name":"Saint Martin","code":"+590","iso":"MF","flag":"🇲🇫"},{"name":"Saint Pierre and Miquelon","code":"+508","iso":"PM","flag":"🇵🇲"},{"name":"Saint Vincent and the Grenadines","code":"+1784","iso":"VC","flag":"🇻🇨"},{"name":"Samoa","code":"+685","iso":"WS","flag":"🇼🇸"},{"name":"San Marino","code":"+378","iso":"SM","flag":"🇸🇲"},{"name":"Sao Tome and Principe","code":"+239","iso":"ST","flag":"🇸🇹"},{"name":"Saudi Arabia","code":"+966","iso":"SA","flag":"🇸🇦"},{"name":"Senegal","code":"+221","iso":"SN","flag":"🇸🇳"},{"name":"Serbia","code":"+381","iso":"RS","flag":"🇷🇸"},{"name":"Seychelles","code":"+248","iso":"SC","flag":"🇸🇨"},{"name":"Sierra Leone","code":"+232","iso":"SL","flag":"🇸🇱"},{"name":"Singapore","code":"+65","iso":"SG","flag":"🇸🇬"},{"name":"Sint Maarten","code":"+1721","iso":"SX","flag":"🇸🇽"},{"name":"Slovakia","code":"+421","iso":"SK","flag":"🇸🇰"},{"name":"Slovenia","code":"+386","iso":"SI","flag":"🇸🇮"},{"name":"Solomon Islands","code":"+677","iso":"SB","flag":"🇸🇧"},{"name":"Somalia","code":"+252","iso":"SO","flag":"🇸🇴"},{"name":"South Africa","code":"+27","iso":"ZA","flag":"🇿🇦"},{"name":"South Korea","code":"+82","iso":"KR","flag":"🇰🇷"},{"name":"South Sudan","code":"+211","iso":"SS","flag":"🇸🇸"},{"name":"Spain","code":"+34","iso":"ES","flag":"🇪🇸"},{"name":"Sri Lanka","code":"+94","iso":"LK","flag":"🇱🇰"},{"name":"Sudan","code":"+249","iso":"SD","flag":"🇸🇩"},{"name":"Suriname","code":"+597","iso":"SR","flag":"🇸🇷"},{"name":"Sweden","code":"+46","iso":"SE","flag":"🇸🇪"},{"name":"Switzerland","code":"+41","iso":"CH","flag":"🇨🇭"},{"name":"Syria","code":"+963","iso":"SY","flag":"🇸🇾"},{"name":"Taiwan","code":"+886","iso":"TW","flag":"🇹🇼"},{"name":"Tajikistan","code":"+992","iso":"TJ","flag":"🇹🇯"},{"name":"Tanzania","code":"+255","iso":"TZ","flag":"🇹🇿"},{"name":"Thailand","code":"+66","iso":"TH","flag":"🇹🇭"},{"name":"Timor-Leste","code":"+670","iso":"TL","flag":"🇹🇱"},{"name":"Togo","code":"+228","iso":"TG","flag":"🇹🇬"},{"name":"Tonga","code":"+676","iso":"TO","flag":"🇹🇴"},{"name":"Trinidad and Tobago","code":"+1868","iso":"TT","flag":"🇹🇹"},{"name":"Tunisia","code":"+216","iso":"TN","flag":"🇹🇳"},{"name":"Turkey","code":"+90","iso":"TR","flag":"🇹🇷"},{"name":"Turkmenistan","code":"+993","iso":"TM","flag":"🇹🇲"},{"name":"Turks and Caicos Islands","code":"+1649","iso":"TC","flag":"🇹🇨"},{"name":"Tuvalu","code":"+688","iso":"TV","flag":"🇹🇻"},{"name":"Uganda","code":"+256","iso":"UG","flag":"🇺🇬"},{"name":"Ukraine","code":"+380","iso":"UA","flag":"🇺🇦"},{"name":"United Arab Emirates","code":"+971","iso":"AE","flag":"🇦🇪"},{"name":"United Kingdom","code":"+44","iso":"GB","flag":"🇬🇧"},{"name":"United States","code":"+1","iso":"US","flag":"🇺🇸"},{"name":"Uruguay","code":"+598","iso":"UY","flag":"🇺🇾"},{"name":"Uzbekistan","code":"+998","iso":"UZ","flag":"🇺🇿"},{"name":"Vanuatu","code":"+678","iso":"VU","flag":"🇻🇺"},{"name":"Vatican City","code":"+39","iso":"VA","flag":"🇻🇦"},{"name":"Venezuela","code":"+58","iso":"VE","flag":"🇻🇪"},{"name":"Vietnam","code":"+84","iso":"VN","flag":"🇻🇳"},{"name":"Yemen","code":"+967","iso":"YE","flag":"🇾🇪"},{"name":"Zambia","code":"+260","iso":"ZM","flag":"🇿🇲"},{"name":"Zimbabwe","code":"+263","iso":"ZW","flag":"🇿🇼"}];

    // Top priority countries for Grade Motion students
    const POPULAR_ISOS = ['MY', 'SG', 'GB', 'CN', 'HK', 'AE', 'AU', 'US', 'CA', 'ID', 'IN', 'CM', 'SA', 'QA'];

    let activeTrigger = null;
    let modalEl = null;
    let searchInput = null;
    let countryListEl = null;
    let emptyStateEl = null;
    let clearBtn = null;
    let quickPicksEl = null;
    let highlightedIndex = -1;
    let currentRenderedItems = [];

    // Inject styles
    function injectStyles() {
        if (document.getElementById('gm-country-picker-styles')) return;
        const style = document.createElement('style');
        style.id = 'gm-country-picker-styles';
        style.textContent = `
            /* --- TRIGGER BUTTONS --- */
            .country-picker-trigger {
                display: inline-flex;
                align-items: center;
                justify-content: space-between;
                gap: 6px;
                cursor: pointer;
                font-family: inherit;
                transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
                user-select: none;
                -webkit-user-select: none;
                box-sizing: border-box;
                text-align: left;
            }
            .country-picker-trigger:active {
                transform: scale(0.98);
            }
            .cp-flag {
                font-size: 17px;
                line-height: 1;
                display: inline-block;
            }
            .cp-code {
                font-weight: 700;
                letter-spacing: 0.2px;
            }
            .cp-arrow {
                font-size: 10px;
                opacity: 0.7;
                transition: transform 0.2s ease;
                margin-left: 2px;
            }
            .country-picker-trigger:hover .cp-arrow {
                opacity: 1;
            }

            /* Light theme (Modals) */
            .phone-input-group .country-picker-trigger {
                width: 125px;
                min-width: 125px;
                flex-shrink: 0;
                padding: 12px 14px;
                border: 1px solid rgba(123, 44, 191, 0.16);
                border-radius: 12px;
                background-color: #fbf9ff;
                color: #2D1E45;
                font-size: 14px;
            }
            .phone-input-group .country-picker-trigger:hover,
            .phone-input-group .country-picker-trigger:focus-visible {
                border-color: #7B2CBF;
                background-color: #ffffff;
                box-shadow: 0 0 0 3px rgba(123, 44, 191, 0.1);
                outline: none;
            }

            /* Dark theme (Telegram section) */
            .tg-country-trigger {
                width: 125px;
                min-width: 125px;
                flex-shrink: 0;
                padding: 15px 12px;
                border-radius: 12px;
                border: 1.5px solid rgba(255, 255, 255, 0.25);
                background: rgba(0, 0, 0, 0.65);
                color: #ffffff;
                font-size: 14.5px;
            }
            .tg-country-trigger:hover,
            .tg-country-trigger:focus-visible {
                border-color: #FF4A95;
                background: rgba(0, 0, 0, 0.85);
                box-shadow: 0 0 0 3px rgba(255, 74, 149, 0.2);
                outline: none;
            }

            @media (max-width: 768px) {
                .tg-country-trigger {
                    width: 100px !important;
                    min-width: 100px !important;
                    padding: 13px 8px !important;
                    font-size: 13.5px !important;
                    border-radius: 10px !important;
                }
            }
            @media (max-width: 420px) {
                .tg-country-trigger {
                    width: 86px !important;
                    min-width: 86px !important;
                    padding: 12px 6px !important;
                    font-size: 12.5px !important;
                }
                .phone-input-group .country-picker-trigger {
                    width: 105px !important;
                    min-width: 105px !important;
                    padding: 10px 8px !important;
                    font-size: 13px !important;
                }
            }
            @media (max-width: 330px) {
                .tg-country-trigger {
                    width: 100% !important;
                    min-width: 100% !important;
                }
                .phone-input-group .country-picker-trigger {
                    width: 100% !important;
                    min-width: 100% !important;
                }
            }

            /* --- GLOBAL COUNTRY MODAL STYLES --- */
            .gm-country-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                z-index: 1000005;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 16px;
                box-sizing: border-box;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .gm-country-modal.active {
                opacity: 1;
                pointer-events: auto;
            }
            .gm-country-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(15, 6, 28, 0.72);
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
            }
            .gm-country-dialog {
                position: relative;
                z-index: 2;
                width: 100%;
                max-width: 440px;
                max-height: 85vh;
                background: linear-gradient(145deg, #1C0C35 0%, #290E4E 100%);
                border: 1.5px solid rgba(255, 74, 149, 0.35);
                border-radius: 24px;
                box-shadow: 0 25px 65px rgba(0, 0, 0, 0.65), 0 0 30px rgba(123, 44, 191, 0.3);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                box-sizing: border-box;
                transform: scale(0.93) translateY(10px);
                transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .gm-country-modal.active .gm-country-dialog {
                transform: scale(1) translateY(0);
            }

            /* Header */
            .gm-country-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 18px 22px 14px 22px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            }
            .gm-country-title {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 16.5px;
                font-weight: 800;
                color: #ffffff;
                letter-spacing: 0.2px;
            }
            .gm-country-close {
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.12);
                color: rgba(255, 255, 255, 0.8);
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                line-height: 1;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            .gm-country-close:hover {
                background: rgba(255, 74, 149, 0.25);
                color: #ffffff;
                border-color: #FF4A95;
                transform: rotate(90deg);
            }

            /* Search input wrapper */
            .gm-country-search-wrap {
                position: relative;
                padding: 14px 20px 10px 20px;
            }
            .gm-search-icon {
                position: absolute;
                left: 34px;
                top: 50%;
                transform: translateY(-50%);
                color: rgba(255, 255, 255, 0.45);
                display: flex;
                align-items: center;
                pointer-events: none;
            }
            .gm-country-search-input {
                width: 100%;
                padding: 12px 38px 12px 42px;
                border-radius: 12px;
                border: 1.5px solid rgba(255, 255, 255, 0.18);
                background: rgba(0, 0, 0, 0.4);
                color: #ffffff;
                font-size: 14.5px;
                font-family: inherit;
                outline: none;
                box-sizing: border-box;
                transition: all 0.2s ease;
            }
            .gm-country-search-input:focus {
                border-color: #FF4A95;
                background: rgba(0, 0, 0, 0.6);
                box-shadow: 0 0 0 3px rgba(255, 74, 149, 0.25);
            }
            .gm-country-search-input::placeholder {
                color: rgba(255, 255, 255, 0.4);
                font-size: 13.5px;
            }
            .gm-search-clear {
                position: absolute;
                right: 32px;
                top: 50%;
                transform: translateY(-50%);
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.5);
                font-size: 18px;
                cursor: pointer;
                padding: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .gm-search-clear:hover {
                color: #ffffff;
            }

            /* Quick Picks (Popular countries) */
            .gm-country-quick-picks {
                display: flex;
                flex-wrap: wrap;
                gap: 6px;
                padding: 0 20px 12px 20px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.06);
            }
            .gm-quick-pill {
                display: inline-flex;
                align-items: center;
                gap: 4px;
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 14px;
                padding: 4px 9px;
                font-size: 12px;
                color: rgba(255, 255, 255, 0.9);
                cursor: pointer;
                transition: all 0.15s ease;
                user-select: none;
            }
            .gm-quick-pill:hover {
                background: rgba(255, 74, 149, 0.2);
                border-color: rgba(255, 74, 149, 0.45);
                color: #ffffff;
                transform: translateY(-1px);
            }
            .gm-quick-pill .qp-flag {
                font-size: 13px;
            }
            .gm-quick-pill .qp-code {
                font-weight: 700;
                color: #FFA0D8;
            }

            /* Country List */
            .gm-country-list {
                flex: 1;
                overflow-y: auto;
                padding: 8px 12px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                gap: 3px;
                scrollbar-width: thin;
                scrollbar-color: rgba(255, 74, 149, 0.3) transparent;
            }
            .gm-country-list::-webkit-scrollbar {
                width: 6px;
            }
            .gm-country-list::-webkit-scrollbar-thumb {
                background: rgba(255, 74, 149, 0.3);
                border-radius: 10px;
            }

            .gm-country-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 14px;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.15s ease;
                user-select: none;
                background: transparent;
                border: 1px solid transparent;
            }
            .gm-country-item:hover,
            .gm-country-item.highlighted {
                background: rgba(255, 74, 149, 0.15);
                border-color: rgba(255, 74, 149, 0.3);
            }
            .gm-country-item.selected {
                background: rgba(123, 44, 191, 0.35);
                border-color: rgba(255, 74, 149, 0.5);
            }
            .gm-item-left {
                display: flex;
                align-items: center;
                gap: 12px;
                min-width: 0;
                flex: 1;
            }
            .gm-item-flag {
                font-size: 22px;
                line-height: 1;
                flex-shrink: 0;
            }
            .gm-item-name {
                font-size: 14px;
                font-weight: 600;
                color: #ffffff;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .gm-item-iso {
                font-size: 11px;
                font-weight: 700;
                color: rgba(255, 255, 255, 0.4);
                margin-left: 6px;
                text-transform: uppercase;
            }
            .gm-item-badge {
                font-size: 13px;
                font-weight: 800;
                color: #FFA0D8;
                background: rgba(255, 74, 149, 0.15);
                border: 1px solid rgba(255, 74, 149, 0.3);
                padding: 3px 8px;
                border-radius: 8px;
                flex-shrink: 0;
                letter-spacing: 0.2px;
            }

            /* Empty state */
            .gm-country-empty {
                padding: 40px 20px;
                text-align: center;
                color: rgba(255, 255, 255, 0.7);
            }
            .gm-country-empty p {
                margin: 0 0 6px 0;
                font-size: 15px;
                font-weight: 600;
                color: #ffffff;
            }

            /* Mobile adjustments */
            @media (max-width: 480px) {
                .gm-country-modal {
                    padding: 0;
                    align-items: flex-end;
                }
                .gm-country-dialog {
                    max-width: 100%;
                    max-height: 80vh;
                    border-radius: 24px 24px 0 0;
                    border-bottom: none;
                    transform: translateY(100%);
                }
                .gm-country-modal.active .gm-country-dialog {
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Create Modal Elements in DOM
    function createModal() {
        if (modalEl) return;
        injectStyles();

        modalEl = document.createElement('div');
        modalEl.className = 'gm-country-modal';
        modalEl.id = 'gm-country-modal';
        modalEl.setAttribute('role', 'dialog');
        modalEl.setAttribute('aria-modal', 'true');
        modalEl.setAttribute('aria-label', 'Select Country / Dial Code');

        modalEl.innerHTML = `
            <div class="gm-country-backdrop" id="gm-country-backdrop"></div>
            <div class="gm-country-dialog">
                <div class="gm-country-header">
                    <div class="gm-country-title">
                        <span>🌍</span>
                        <span>Select Country</span>
                    </div>
                    <button type="button" class="gm-country-close" id="gm-country-close" aria-label="Close">&times;</button>
                </div>
                <div class="gm-country-search-wrap">
                    <span class="gm-search-icon">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </span>
                    <input type="text" id="gm-country-search-input" class="gm-country-search-input" placeholder="Search country, dial code (e.g. Cameroon, 237)..." autocomplete="off" spellcheck="false">
                    <button type="button" id="gm-search-clear" class="gm-search-clear" aria-label="Clear search" style="display: none;">&times;</button>
                </div>
                <div class="gm-country-quick-picks" id="gm-country-quick-picks"></div>
                <div class="gm-country-list" id="gm-country-list" role="listbox"></div>
                <div class="gm-country-empty" id="gm-country-empty" style="display: none;">
                    <div style="font-size: 26px; margin-bottom: 6px;">🔍</div>
                    <p>No country found matching "<span id="gm-search-query-text"></span>"</p>
                    <span style="font-size: 12px; opacity: 0.7;">Try searching by country name, ISO code, or dial code</span>
                </div>
            </div>
        `;

        document.body.appendChild(modalEl);

        searchInput = modalEl.querySelector('#gm-country-search-input');
        countryListEl = modalEl.querySelector('#gm-country-list');
        emptyStateEl = modalEl.querySelector('#gm-country-empty');
        clearBtn = modalEl.querySelector('#gm-search-clear');
        quickPicksEl = modalEl.querySelector('#gm-country-quick-picks');

        // Render quick pick popular buttons
        renderQuickPicks();

        // Event listeners for close
        modalEl.querySelector('#gm-country-close').addEventListener('click', closeModal);
        modalEl.querySelector('#gm-country-backdrop').addEventListener('click', closeModal);

        // Search input handling
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            clearBtn.style.display = query ? 'flex' : 'none';
            filterCountries(query);
        });

        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearBtn.style.display = 'none';
            filterCountries('');
            searchInput.focus();
        });

        // Keyboard navigation
        modalEl.addEventListener('keydown', handleKeyDown);
    }

    function renderQuickPicks() {
        quickPicksEl.innerHTML = '';
        POPULAR_ISOS.forEach(iso => {
            const country = COUNTRIES.find(c => c.iso === iso);
            if (!country) return;
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'gm-quick-pill';
            btn.innerHTML = `<span class="qp-flag">${country.flag}</span> <span class="qp-name">${country.name}</span> <span class="qp-code">${country.code}</span>`;
            btn.addEventListener('click', () => {
                selectCountry(country);
            });
            quickPicksEl.appendChild(btn);
        });
    }

    function renderCountryList(list) {
        currentRenderedItems = list;
        highlightedIndex = -1;
        countryListEl.innerHTML = '';

        if (list.length === 0) {
            countryListEl.style.display = 'none';
            emptyStateEl.style.display = 'block';
            modalEl.querySelector('#gm-search-query-text').textContent = searchInput.value.trim();
            return;
        }

        countryListEl.style.display = 'flex';
        emptyStateEl.style.display = 'none';

        // Check active value
        let currentTargetVal = '';
        if (activeTrigger) {
            const targetId = activeTrigger.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl) currentTargetVal = targetEl.value;
        }

        const fragment = document.createDocumentFragment();
        list.forEach((country, idx) => {
            const item = document.createElement('div');
            item.className = 'gm-country-item';
            if (country.code === currentTargetVal) {
                item.classList.add('selected');
            }
            item.setAttribute('role', 'option');
            item.setAttribute('data-index', idx);
            item.innerHTML = `
                <div class="gm-item-left">
                    <span class="gm-item-flag">${country.flag}</span>
                    <span class="gm-item-name">${country.name} <span class="gm-item-iso">${country.iso}</span></span>
                </div>
                <span class="gm-item-badge">${country.code}</span>
            `;
            item.addEventListener('click', () => {
                selectCountry(country);
            });
            item.addEventListener('mouseenter', () => {
                setHighlightedIndex(idx, false);
            });
            fragment.appendChild(item);
        });

        countryListEl.appendChild(fragment);
    }



    const ALIASES = {
        GB: ['uk', 'britain', 'england', 'scotland', 'wales', 'great britain'],
        US: ['usa', 'america', 'united states of america'],
        AE: ['uae', 'dubai', 'abu dhabi', 'emirates'],
        SA: ['ksa', 'saudi'],
        MY: ['msia', 'malaysia'],
        SG: ['sg', 'spore', 'singapore'],
        KR: ['south korea', 'korea'],
        RU: ['russia', 'russian federation'],
        CD: ['drc', 'dr congo'],
        CG: ['republic of congo', 'congo brazzaville'],
        TZ: ['tanzania', 'zanzibar'],
        TT: ['trinidad', 'tobago'],
        BA: ['bosnia', 'herzegovina'],
        AG: ['antigua', 'barbuda'],
        KN: ['st kitts', 'nevis', 'saint kitts'],
        LC: ['st lucia', 'saint lucia'],
        VC: ['st vincent', 'grenadines', 'saint vincent'],
        ST: ['sao tome', 'principe'],
        VA: ['vatican', 'holy see']
    };

    function filterCountries(query) {
        if (!query) {
            renderCountryList(COUNTRIES);
            quickPicksEl.style.display = 'flex';
            return;
        }

        // Hide quick picks during search to save vertical room
        quickPicksEl.style.display = 'none';

        const cleanQuery = query.replace(/^\+/, '');
        const filtered = COUNTRIES.filter(c => {
            const nameMatch = c.name.toLowerCase().includes(query);
            const isoMatch = c.iso.toLowerCase() === query;
            const codeMatch = c.code.replace(/^\+/, '').includes(cleanQuery);
            const aliasList = ALIASES[c.iso];
            const aliasMatch = aliasList && aliasList.some(a => a === query || a.startsWith(query) || a.includes(query));
            return nameMatch || isoMatch || codeMatch || aliasMatch;
        });

        filtered.sort((a, b) => {
            const aName = a.name.toLowerCase();
            const bName = b.name.toLowerCase();
            const aCode = a.code.replace(/^\+/, '');
            const bCode = b.code.replace(/^\+/, '');
            const aAlias = ALIASES[a.iso] && ALIASES[a.iso].includes(query);
            const bAlias = ALIASES[b.iso] && ALIASES[b.iso].includes(query);

            if (aAlias && !bAlias) return -1;
            if (!aAlias && bAlias) return 1;

            const aStarts = aName.startsWith(query) || aCode.startsWith(cleanQuery) || a.iso.toLowerCase() === query;
            const bStarts = bName.startsWith(query) || bCode.startsWith(cleanQuery) || b.iso.toLowerCase() === query;

            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;
            return aName.localeCompare(bName);
        });

        renderCountryList(filtered);
    }

    function setHighlightedIndex(index, scrollIntoView = true) {
        const items = countryListEl.querySelectorAll('.gm-country-item');
        items.forEach(el => el.classList.remove('highlighted'));

        if (index >= 0 && index < items.length) {
            highlightedIndex = index;
            const activeItem = items[index];
            activeItem.classList.add('highlighted');
            if (scrollIntoView) {
                activeItem.scrollIntoView({ block: 'nearest' });
            }
        } else {
            highlightedIndex = -1;
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Escape') {
            closeModal();
            return;
        }

        const items = countryListEl.querySelectorAll('.gm-country-item');
        if (!items.length) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            let nextIndex = highlightedIndex + 1;
            if (nextIndex >= items.length) nextIndex = 0;
            setHighlightedIndex(nextIndex, true);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            let prevIndex = highlightedIndex - 1;
            if (prevIndex < 0) prevIndex = items.length - 1;
            setHighlightedIndex(prevIndex, true);
        } else if (e.key === 'Enter') {
            if (highlightedIndex >= 0 && currentRenderedItems[highlightedIndex]) {
                e.preventDefault();
                selectCountry(currentRenderedItems[highlightedIndex]);
            }
        }
    }

    function openModal(triggerBtn) {
        createModal();
        activeTrigger = triggerBtn;

        searchInput.value = '';
        clearBtn.style.display = 'none';
        quickPicksEl.style.display = 'flex';
        filterCountries('');

        modalEl.style.display = 'flex';
        // Trigger reflow for animation
        modalEl.offsetHeight;
        modalEl.classList.add('active');

        // Focus search input after animation
        setTimeout(() => {
            searchInput.focus();
        }, 80);
    }

    function closeModal() {
        if (!modalEl) return;
        modalEl.classList.remove('active');
        setTimeout(() => {
            if (!modalEl.classList.contains('active')) {
                modalEl.style.display = 'none';
            }
        }, 260);

        if (activeTrigger) {
            activeTrigger.focus();
        }
    }

    function selectCountry(country) {
        if (!activeTrigger) return;

        const targetId = activeTrigger.getAttribute('data-target');
        const targetInput = document.getElementById(targetId);

        if (targetInput) {
            targetInput.value = country.code;
            targetInput.dispatchEvent(new Event('input', { bubbles: true }));
            targetInput.dispatchEvent(new Event('change', { bubbles: true }));
        }

        // Update button appearance
        const flagEl = activeTrigger.querySelector('.cp-flag');
        const codeEl = activeTrigger.querySelector('.cp-code');
        if (flagEl) flagEl.textContent = country.flag;
        if (codeEl) codeEl.textContent = country.code;
        activeTrigger.setAttribute('aria-label', `Country code: ${country.name} ${country.code}`);

        closeModal();

        // Auto focus the adjacent phone input for slick user flow
        const parentRow = activeTrigger.closest('.tg-phone-row, .phone-input-group, form');
        if (parentRow) {
            const phoneInput = parentRow.querySelector('input[type="tel"], #tg-phone, #student-phone, #contact-phone');
            if (phoneInput) {
                setTimeout(() => phoneInput.focus(), 150);
            }
        }
    }

    // Initialize all triggers on page
    function initCountryPickers() {
        document.querySelectorAll('.country-picker-trigger').forEach(trigger => {
            if (trigger.getAttribute('data-cp-bound') === 'true') return;
            trigger.setAttribute('data-cp-bound', 'true');
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                openModal(trigger);
            });
        });

        // Listen for form resets to restore trigger visuals
        document.querySelectorAll('form').forEach(form => {
            if (form.getAttribute('data-cp-reset-bound') === 'true') return;
            form.setAttribute('data-cp-reset-bound', 'true');
            form.addEventListener('reset', () => {
                setTimeout(() => {
                    form.querySelectorAll('.country-picker-trigger').forEach(trig => {
                        const targetId = trig.getAttribute('data-target');
                        const targetInput = document.getElementById(targetId);
                        const val = targetInput ? targetInput.value : '+60';
                        const country = COUNTRIES.find(c => c.code === val) || COUNTRIES.find(c => c.iso === 'MY');
                        if (country) {
                            const flagEl = trig.querySelector('.cp-flag');
                            const codeEl = trig.querySelector('.cp-code');
                            if (flagEl) flagEl.textContent = country.flag;
                            if (codeEl) codeEl.textContent = country.code;
                        }
                    });
                }, 20);
            });
        });
    }

    // Expose API globally
    window.GradeMotionCountryPicker = {
        open: openModal,
        close: closeModal,
        init: initCountryPickers,
        countries: COUNTRIES
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCountryPickers);
    } else {
        initCountryPickers();
    }
})();
