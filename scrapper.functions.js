"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectExperiencesFromExperiencesScreen = exports.collectExperienceFromMainProfileScreen = exports.getSkills = exports.getSkillsInMainScreen = exports.collectContactInfo = exports.downloadCSVFile = exports.downloadFile = exports.downloadCSV = exports.exportAndDownload = exports.getProfileDetailsInsidePosts = exports.getProfileDetailsFromMainScreen = exports.removeTaklsAboutString = void 0;
var removeTaklsAboutString = function (value) {
    var _a;
    value = (_a = value === null || value === void 0 ? void 0 : value.replace) === null || _a === void 0 ? void 0 : _a.call(value, 'Talks about', '');
    if (value === null || value === void 0 ? void 0 : value.startsWith(' ')) {
        value = value === null || value === void 0 ? void 0 : value.slice(1);
    }
    return value || '';
};
exports.removeTaklsAboutString = removeTaklsAboutString;
var getProfileDetailsFromMainScreen = function (profileURL, document) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5;
    // @ts-ignore
    var name = (_d = (_c = (_b = (_a = document.querySelector("main section h1")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.replace(/\n/g, '')) === null || _c === void 0 ? void 0 : _c.replace(/\s+/g, ' ')) === null || _d === void 0 ? void 0 : _d.trim();
    console.log("Name ; ", name);
    // @ts-ignore
    var img_url = (_e = document.querySelector('main section .pv-top-card-profile-picture img')) === null || _e === void 0 ? void 0 : _e.src;
    // @ts-ignore
    var title = (_j = (_h = (_g = (_f = document.querySelector('main section .text-body-medium.break-words')) === null || _f === void 0 ? void 0 : _f.textContent) === null || _g === void 0 ? void 0 : _g.replace(/\n/g, '')) === null || _h === void 0 ? void 0 : _h.replace(/\s+/g, ' ')) === null || _j === void 0 ? void 0 : _j.trim();
    // @ts-ignore
    var talksAbout = ((_m = (_l = (_k = document.querySelector('main section .text-body-small.t-black--light.break-words.mt2')) === null || _k === void 0 ? void 0 : _k.innerText) === null || _l === void 0 ? void 0 : _l.split('\n')) === null || _m === void 0 ? void 0 : _m[0]) || '';
    // @ts-ignore
    var location = ((_r = (_q = (_p = (_o = document.querySelector('main section .text-body-small.inline.t-black--light.break-words')) === null || _o === void 0 ? void 0 : _o.textContent) === null || _p === void 0 ? void 0 : _p.replace(/\n/g, '')) === null || _q === void 0 ? void 0 : _q.replace(/\s+/g, ' ')) === null || _r === void 0 ? void 0 : _r.trim()) || '';
    console.log("Location ; ", location);
    // @ts-ignore
    var followersWay1 = (_u = (_t = (_s = document.querySelector('main section .text-body-small.t-black--light.inline-block')) === null || _s === void 0 ? void 0 : _s.innerText) === null || _t === void 0 ? void 0 : _t.replaceAll('followers', '')) === null || _u === void 0 ? void 0 : _u.replaceAll(' ', '');
    var activity = document.querySelector('#content_collections');
    var followersWay2 = (_z = (_y = (_x = (_w = (_v = activity === null || activity === void 0 ? void 0 : activity.parentElement) === null || _v === void 0 ? void 0 : _v.querySelector('.pvs-header__container .pvs-header__subtitle')) === null || _w === void 0 ? void 0 : _w.innerText) === null || _x === void 0 ? void 0 : _x.split) === null || _y === void 0 ? void 0 : _y.call(_x, ' ')) === null || _z === void 0 ? void 0 : _z[0];
    // @ts-ignore
    var connectionWay1 = (_1 = (_0 = document.querySelector('main section .text-body-small .t-black--light .t-bold')) === null || _0 === void 0 ? void 0 : _0.innerText) === null || _1 === void 0 ? void 0 : _1.replaceAll('+', '');
    // @ts-ignore
    var connectionWay2 = (_3 = (_2 = document.querySelector('main section ul.pv-top-card--list a .link-without-visited-state .t-bold')) === null || _2 === void 0 ? void 0 : _2.innerText) === null || _3 === void 0 ? void 0 : _3.replaceAll('+', '');
    var aboutParentEle = (_4 = document.querySelector('#about')) === null || _4 === void 0 ? void 0 : _4.parentElement;
    var about = ((_5 = aboutParentEle === null || aboutParentEle === void 0 ? void 0 : aboutParentEle.querySelector('.inline-show-more-text span')) === null || _5 === void 0 ? void 0 : _5.innerText) || '';
    var profile = {
        name: name || '',
        img_url: img_url || '',
        title: title || '',
        talksAbout: talksAbout ? (0, exports.removeTaklsAboutString)(talksAbout) : '',
        location: location || '',
        followers: followersWay1 || followersWay2 || '',
        connections: connectionWay1 || connectionWay2 || '',
        about: about || '',
        url: profileURL
    };
    return profile;
};
exports.getProfileDetailsFromMainScreen = getProfileDetailsFromMainScreen;
var getProfileDetailsInsidePosts = function () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var nameElement = document.querySelector('.scaffold-layout__sidebar #recent-activity-top-card .break-words h3');
    var name = nameElement === null || nameElement === void 0 ? void 0 : nameElement.innerText;
    var titleElement = document.querySelector('.scaffold-layout__sidebar #recent-activity-top-card .break-words h4');
    var title = titleElement === null || titleElement === void 0 ? void 0 : titleElement.innerText;
    var extraInfo = document.querySelector('.scaffold-layout__sidebar #recent-activity-top-card .pv-recent-activity-top-card__extra-info');
    var extraInfoChildNodes = (extraInfo === null || extraInfo === void 0 ? void 0 : extraInfo.children) || [];
    var followers = ((_a = extraInfoChildNodes === null || extraInfoChildNodes === void 0 ? void 0 : extraInfoChildNodes[0]) === null || _a === void 0 ? void 0 : _a.nodeName) === 'DIV' ? (_d = (_c = (_b = extraInfoChildNodes === null || extraInfoChildNodes === void 0 ? void 0 : extraInfoChildNodes[0]) === null || _b === void 0 ? void 0 : _b.innerText) === null || _c === void 0 ? void 0 : _c.split('\n')) === null || _d === void 0 ? void 0 : _d[1] : '';
    var talksAbout = ((_e = extraInfoChildNodes === null || extraInfoChildNodes === void 0 ? void 0 : extraInfoChildNodes[1]) === null || _e === void 0 ? void 0 : _e.nodeName) === 'P' ? (_h = (_g = (_f = extraInfoChildNodes === null || extraInfoChildNodes === void 0 ? void 0 : extraInfoChildNodes[1]) === null || _f === void 0 ? void 0 : _f.innerText) === null || _g === void 0 ? void 0 : _g.split('\n')) === null || _h === void 0 ? void 0 : _h[0] : '';
    var profile = {
        name: name || '',
        title: title || '',
        followers: followers || '',
        talksAbout: talksAbout ? (0, exports.removeTaklsAboutString)(talksAbout) : '',
    };
    return profile;
};
exports.getProfileDetailsInsidePosts = getProfileDetailsInsidePosts;
var exportAndDownload = function (data, dataName) {
    if (dataName === void 0) { dataName = ""; }
    var prefix = 'data';
    var json = JSON.stringify(data, null, 4);
    json = [json];
    var blob = new Blob(json, { type: "text/json" });
    var fileName = "".concat(prefix, "#@#").concat(dataName, ".json");
    //Check the Browser.
    var isIE = /MSIE|Trident/.test(window.navigator.userAgent);
    if (isIE) {
        window.navigator.msSaveBlob(blob, fileName);
    }
    else {
        (0, exports.downloadFile)(blob, fileName);
    }
};
exports.exportAndDownload = exportAndDownload;
var downloadCSV = function (data) {
    var blob = new Blob([data], { type: 'text/csv' });
    (0, exports.downloadFile)(blob, 'profiles.csv');
};
exports.downloadCSV = downloadCSV;
var downloadFile = function (blob, fileName) {
    var url = window.URL || window.webkitURL;
    var link = url.createObjectURL(blob);
    var a = document.createElement("a");
    a.download = fileName;
    a.href = link;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};
exports.downloadFile = downloadFile;
var downloadCSVFile = function (csvData, fileName) {
    // Download the CSV file
    var anchor = document.createElement('a');
    anchor.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvData);
    anchor.target = '_blank';
    anchor.download = "".concat(fileName, ".csv");
    anchor.click();
};
exports.downloadCSVFile = downloadCSVFile;
var collectContactInfo = function () {
    var _a, _b, _c, _d, _e, _f;
    var contactOverlay = document.querySelector('#artdeco-modal-outlet');
    var contactInfo = {
        url: '',
        email: '',
        phone: '',
        birthDate: ''
    };
    if (contactOverlay) {
        // setLog("Contact Overlay Visible " + contactOverlay);
        var ul = document.querySelector('#artdeco-modal-outlet section .section-info');
        // setLog("UL for contact" + ul?.outerHTML);
        var lis = (ul === null || ul === void 0 ? void 0 : ul.children) || [];
        // // setLog("LI for contact" + lis);
        for (var i = 0; i < lis.length; i++) {
            var li = lis[i];
            // setLog("Each LI : " + li.outerHTML);
            var urlPattern = /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+$/;
            var isUrl = (_a = li.querySelector('.pv-contact-info__ci-container a')) === null || _a === void 0 ? void 0 : _a.outerHTML.match(urlPattern);
            // setLog("URL HTML : " + li.querySelector('.pv-contact-info__ci-container a')?.outerHTML)
            var isEmail = (_d = (_c = (_b = li.querySelector('.pv-contact-info__ci-container a')) === null || _b === void 0 ? void 0 : _b.innerText) === null || _c === void 0 ? void 0 : _c.replaceAll(' ', '')) === null || _d === void 0 ? void 0 : _d.replaceAll('\n', '');
            var numberPattern = /\b\d{10}\b/g;
            // setLog("PHONE HTML : " + li.querySelector('.pv-contact-info__ci-container span')?.outerHTML)
            var isPhone = (_e = li.querySelector('.pv-contact-info__ci-container span')) === null || _e === void 0 ? void 0 : _e.outerHTML.match(numberPattern);
            if (isPhone) {
                // setLog("PHONE FOUND : "+isPhone)
            }
            var isBirthDate = (_f = li.querySelector('.pv-contact-info__ci-container span .pv-contact-info__contact-item')) === null || _f === void 0 ? void 0 : _f.innerText;
            if (isUrl) {
                contactInfo.url = isUrl;
            }
            if (isEmail) {
                contactInfo.email = isEmail;
            }
            if (isPhone) {
                contactInfo.phone = isPhone;
            }
            if (isBirthDate) {
                contactInfo.birthDate = isBirthDate;
            }
        }
    }
    // setLog(contactInfo)
    return contactInfo;
};
exports.collectContactInfo = collectContactInfo;
// export const getPosts = (lis: any[]) => {
//   const posts = [];
//   for (let i = 0 ; i < lis.length ; i++) {
//     const li = lis[i];
//     const post = li.querySelector('.profile-creator-shared-feed-update__container .update-components-text')?.innerText;
//     const urn = li.querySelector('[data-urn]')?.getAttribute('data-urn')?.split(':') || [];
//     const postId = urn?.[urn?.length - 1] || '';
//     const imagesElements = li.querySelector('.profile-creator-shared-feed-update__container .update-components-image .update-components-image__container')?.children || [];
//     const likesCountWay1 = li.querySelector('.social-details-social-counts ul .social-details-social-counts__reactions .social-details-social-counts__reactions-count')?.innerText;
//     const likesCountWay2 = li.querySelector('.social-details-social-counts ul .social-details-social-counts__reactions .social-details-social-counts__social-proof-fallback-number')?.innerText;
//     const isCommentOnFirstIndex = li.querySelector('.social-details-social-counts ul')?.children?.[1]?.innerText?.includes('comment');
//     const isRepostOnFirstIndex = li.querySelector('.social-details-social-counts ul')?.children?.[1]?.innerText?.includes('repost');
//     const repostIndex = isRepostOnFirstIndex ? 1 : 2;
//     const commentsCount = isCommentOnFirstIndex ? li.querySelector('.social-details-social-counts ul')?.children?.[1]?.innerText?.split?.(' ')?.[0] || 0 : 0;
//     const repostsCount = li.querySelector('.social-details-social-counts ul')?.children?.[repostIndex]?.innerText?.split?.(' ')?.[0] || 0;
//     const images = [];
//     for (let j = 0 ; j < imagesElements.length ; j++) {
//       images.push(imagesElements?.[j]?.querySelector('button img')?.src);
//     }
//     const video = li.querySelector('.profile-creator-shared-feed-update__container .update-components-linkedin-video video')?.src;
//     if (post) {
//       posts.push({
//         postId: postId,
//         post: post,
//         likes: likesCountWay1 || likesCountWay2,
//         comments: commentsCount,
//         repost: repostsCount,
//         images: images.length ? images : [],
//         video: video ? video : ''
//       });
//     }
//   }
//   return posts;
// }
var getSkillsInMainScreen = function (document) {
    var _a, _b;
    var parentEle = (_a = document === null || document === void 0 ? void 0 : document.querySelector('#skills')) === null || _a === void 0 ? void 0 : _a.parentElement;
    var lis = ((_b = parentEle === null || parentEle === void 0 ? void 0 : parentEle.querySelector('ul')) === null || _b === void 0 ? void 0 : _b.children) || [];
    return collectSkills(lis);
};
exports.getSkillsInMainScreen = getSkillsInMainScreen;
var getSkills = function (document) {
    var _a;
    var lis = ((_a = document.querySelector('main section ul')) === null || _a === void 0 ? void 0 : _a.children) || [];
    return collectSkills(lis);
};
exports.getSkills = getSkills;
var collectSkills = function (lis) {
    var _a, _b, _c;
    if (lis === void 0) { lis = []; }
    var skills = [];
    for (var i = 0; i < lis.length; i++) {
        var li = lis[i];
        var skill = (_c = (_b = (_a = li.querySelector('a')) === null || _a === void 0 ? void 0 : _a.innerText) === null || _b === void 0 ? void 0 : _b.split('\n')) === null || _c === void 0 ? void 0 : _c[0];
        skills.push(skill);
    }
    return skills;
};
// export const exportPeopleFromSearch = () => {
//   const lis = document.querySelector('.reusable-search__result-container')?.parentElement?.children || [];
//   const searchResults = [];
//   for (let i = 0; i < lis.length; i++) {
//     const li: any = lis[i];
//     const nameEle: any = li.querySelector('.entity-result__title-text a');
//     const name = nameEle?.innerText?.split?.('\n')?.[0];
//     const image = li.querySelector('img')?.src || '';
//     const url = nameEle?.href?.split?.('?')?.[0];
//     const miniProfile = decodeURIComponent(nameEle?.href)?.split('fs_miniProfile:')?.[1];
//     const whoAmI = li.querySelector('.ivm-image-view-model li-icon')?.ariaLabel || '';
//     const title: any = li.querySelector('.linked-area .entity-result__primary-subtitle')?.innerText;
//     const location = li.querySelector('.linked-area .entity-result__secondary-subtitle')?.innerText;
//     const talksAboutOrPosition = li.querySelector('.entity-result__summary')?.children?.[0]?.innerText?.split?.('\n')?.[0];
//     const talksAbout = talksAboutOrPosition?.includes('Talks about') ? talksAboutOrPosition : '';
//     const provide = (talksAboutOrPosition?.includes('Provides') && talksAboutOrPosition?.includes('services')) ? talksAboutOrPosition : '';
//     const position = (!talksAbout && !provide) ? talksAboutOrPosition : '';
//     const followersContent = li.querySelector('.entity-result__summary')?.children?.[2]?.innerText?.split?.('\n')?.[0];
//     const followers = followersContent?.includes('followers') ? followersContent : '';
//     const followersCount =  followers?.split(' ')?.[0];
//     searchResults.push({
//       name: name || '',
//       img_url: image || '',
//       url,
//       miniProfile: miniProfile || '',
//       whoAmI: whoAmI || '',
//       title: title || '',
//       location: location || '',
//       talksAbout: talksAbout ? removeTaklsAboutString(talksAbout) : '',
//       provide: provide || '',
//       position: position || '',
//       followers: followersCount || ''
//     });
//   }
//   return searchResults;
// }
var collectExperienceFromMainProfileScreen = function (document) {
    var _a;
    var experienceParentEle = (_a = document.querySelector('#experience')) === null || _a === void 0 ? void 0 : _a.parentElement;
    var ul = experienceParentEle === null || experienceParentEle === void 0 ? void 0 : experienceParentEle.querySelector('ul');
    var lis = (ul === null || ul === void 0 ? void 0 : ul.children) || [];
    return collectExperiences(lis);
};
exports.collectExperienceFromMainProfileScreen = collectExperienceFromMainProfileScreen;
var collectExperiencesFromExperiencesScreen = function (document) {
    var ul = document.querySelector('.scaffold-finite-scroll__content ul');
    var lis = (ul === null || ul === void 0 ? void 0 : ul.children) || [];
    return collectExperiences(lis);
};
exports.collectExperiencesFromExperiencesScreen = collectExperiencesFromExperiencesScreen;
var collectExperiences = function (lis) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4;
    if (lis === void 0) { lis = []; }
    var experiences = [];
    for (var i = 0; i < lis.length; i++) {
        var li = lis[i];
        var companyDetail = li.querySelector('.display-flex.flex-row.justify-space-between .display-flex.flex-column.full-width');
        var companyChildren = (companyDetail === null || companyDetail === void 0 ? void 0 : companyDetail.children) || [];
        var tcompanyName = void 0;
        var companyName = '';
        var tperiod = void 0;
        var period = '';
        var workLocation = '';
        var tworkLocation = void 0;
        var role = '';
        var trole = void 0;
        // console.log(companyChildren?.[1]?.textContent);
        if (companyDetail.nodeName === 'A') {
            companyName = ((_c = (_b = (_a = companyChildren === null || companyChildren === void 0 ? void 0 : companyChildren[0]) === null || _a === void 0 ? void 0 : _a.innerText) === null || _b === void 0 ? void 0 : _b.split('\n')) === null || _c === void 0 ? void 0 : _c[0]) || '';
            period = ((_f = (_e = (_d = companyChildren === null || companyChildren === void 0 ? void 0 : companyChildren[1]) === null || _d === void 0 ? void 0 : _d.innerText) === null || _e === void 0 ? void 0 : _e.split('\n')) === null || _f === void 0 ? void 0 : _f[0]) || '';
            workLocation = ((_j = (_h = (_g = companyChildren === null || companyChildren === void 0 ? void 0 : companyChildren[2]) === null || _g === void 0 ? void 0 : _g.textContent) === null || _h === void 0 ? void 0 : _h.split('\n')) === null || _j === void 0 ? void 0 : _j[0]) || '';
        }
        else {
            // tcompanyName = Array.from(new Set((companyChildren[1]?.textContent || "")?.trim().split(/\s+/))) || [];
            // companyName = (tcompanyName.length >1?tcompanyName.slice(0, -2).concat(tcompanyName.slice(-1)) || "" : tcompanyName).join(" ");
            companyName = (_p = (_o = (_m = (_l = (_k = companyChildren === null || companyChildren === void 0 ? void 0 : companyChildren[1]) === null || _k === void 0 ? void 0 : _k.querySelector("span")) === null || _l === void 0 ? void 0 : _l.textContent) === null || _m === void 0 ? void 0 : _m.replace(/\n/g, ' ')) === null || _o === void 0 ? void 0 : _o.replace(/\s+/g, ' ')) === null || _p === void 0 ? void 0 : _p.trim();
            period = (_u = (_t = (_s = (_r = (_q = companyChildren === null || companyChildren === void 0 ? void 0 : companyChildren[2]) === null || _q === void 0 ? void 0 : _q.querySelector("span")) === null || _r === void 0 ? void 0 : _r.textContent) === null || _s === void 0 ? void 0 : _s.replace(/\n/g, ' ')) === null || _t === void 0 ? void 0 : _t.replace(/\s+/g, ' ')) === null || _u === void 0 ? void 0 : _u.trim();
            workLocation = (_z = (_y = (_x = (_w = (_v = companyChildren === null || companyChildren === void 0 ? void 0 : companyChildren[3]) === null || _v === void 0 ? void 0 : _v.querySelector("span")) === null || _w === void 0 ? void 0 : _w.textContent) === null || _x === void 0 ? void 0 : _x.replace(/\n/g, ' ')) === null || _y === void 0 ? void 0 : _y.replace(/\s+/g, ' ')) === null || _z === void 0 ? void 0 : _z.trim();
            role = (_4 = (_3 = (_2 = (_1 = (_0 = companyChildren === null || companyChildren === void 0 ? void 0 : companyChildren[0]) === null || _0 === void 0 ? void 0 : _0.querySelector("span")) === null || _1 === void 0 ? void 0 : _1.textContent) === null || _2 === void 0 ? void 0 : _2.replace(/\n/g, ' ')) === null || _3 === void 0 ? void 0 : _3.replace(/\s+/g, ' ')) === null || _4 === void 0 ? void 0 : _4.trim();
            // tperiod = Array.from(new Set((companyChildren[2]?.textContent || "")?.trim().split(/\s+/))) || [];
            // period = (tperiod.length >1?tperiod.slice(0, -2).concat(tperiod.slice(-1)) || "" : tperiod).join(" ");
            // tworkLocation = Array.from(new Set((companyChildren[3]?.textContent || "")?.trim().split(/\s+/))) || [];
            // workLocation = (tworkLocation.length >1?tworkLocation.slice(0, -2).concat(tworkLocation.slice(-1)) || "" : tworkLocation).join(" ");
            // trole = Array.from(new Set((companyChildren[0]?.textContent || "")?.trim().split(/\s+/)));
            // role = (trole.length >1?trole.slice(0, -2).concat(trole.slice(-1)) || "" : trole).join(" ");
        }
        var company = {
            role: role || '',
            companyName: companyName || '',
            period: period || '',
            location: workLocation || ''
        };
        console.log(company);
        experiences.push(company);
    }
    return experiences;
};
// export const scrapEmailsByProfile = async (people: string[]) => {
//   let csvData = 'Url, Email' + "\r\n";
//   people = people.filter(a => a.trim() ? a : false);
//   for (let [index, profileId] of people.entries()) {	  
//     profileId = profileId.endsWith('\r') ? profileId.replace('\r', '') : profileId;
//     profileId = profileId.endsWith('/') ? profileId.substring(0, profileId.length - 1) : profileId;
//     if (profileId) {
//       await fetch(`${profileId}/overlay/contact-info/`).then((res) => res.text()).then(async (res) => {
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(res, 'text/html');
//         const codes = doc.getElementsByTagName('code');
//         const exactProfile = await Array.from(codes).filter(code => {
//           const textContent: any = code?.textContent;
//           if (textContent?.includes('emailAddress')) {
//             const profile = JSON.parse(textContent || {}).included.filter((a: any) => { if (a.firstName) return a; }).filter((a: any) => a?.['*memberRelationship'])?.[0];
//             const email = profile?.emailAddress?.emailAddress ? profile?.emailAddress?.emailAddress : '';
//             const phoneNumbers = profile?.phoneNumbers.map((a: any) => a?.phoneNumber?.number).filter((b: any) => b).join(',');
//             const websites = profile?.websites.map((a: any) => ((a?.label && a?.label !== null && a?.label !== 'null') ? a?.label : a?.category)?.toLowerCase() + "::" + a?.url).filter((b: any) => b).join(',');
//             if (profile) {
//               csvData = csvData + profileId + ',' + email + "\r\n";
//               return code;
//             }
//           }
//         })?.[0] || {};
//         if ((index + 1) === people.length) {
//           downloadCSVFile(csvData, 'profiles');
//         }
//       }).catch(() => {
//         downloadCSVFile(csvData, 'profiles');
//       });
//     }
//   }
// }
