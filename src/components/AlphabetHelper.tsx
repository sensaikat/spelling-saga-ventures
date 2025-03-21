
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Language-specific alphabet mappings with expanded character sets
const alphabets: Record<string, Record<string, string[]>> = {
  en: {
    letters: "abcdefghijklmnopqrstuvwxyz".split(''),
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''),
    numbers: "0123456789".split(''),
    punctuation: ".,?!':;\"()-_@#$%&*+=/\\<>[]{}|~^`".split('')
  },
  es: {
    letters: "abcdefghijklmnñopqrstuvwxyz".split(''),
    uppercase: "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split(''),
    numbers: "0123456789".split(''),
    punctuation: ".,?!':;\"¿¡()-_@#$%&*+=/\\<>[]{}|~^`".split('')
  },
  fr: {
    letters: "abcdefghijklmnopqrstuvwxyzàâæçéèêëîïôœùûüÿ".split(''),
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZÀÂÆÇÉÈÊËÎÏÔŒÙÛÜŸ".split(''),
    numbers: "0123456789".split(''),
    punctuation: ".,?!':;\"()-_@#$%&*+=/\\<>[]{}|~^`".split('')
  },
  de: {
    letters: "abcdefghijklmnopqrstuvwxyzäöüß".split(''),
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜß".split(''),
    numbers: "0123456789".split(''),
    punctuation: ".,?!':;\"()-_@#$%&*+=/\\<>[]{}|~^`".split('')
  },
  cs: {
    letters: "abcdefghijklmnopqrstuvwxyzáčďéěíňóřšťúůýž".split(''),
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ".split(''),
    numbers: "0123456789".split(''),
    punctuation: ".,?!':;\"()-_@#$%&*+=/\\<>[]{}|~^`".split('')
  },
  hi: {
    letters: "अ आ इ ई उ ऊ ऋ ए ऐ ओ औ क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह क्ष त्र ज्ञ".split(' '),
    vowelSigns: "ा ि ी ु ू ृ े ै ो ौ ं ः ँ ॅ ॆ ॏ ॉ ॊ ॎ".split(' '),
    conjuncts: "क्क क्त क्र क्ष क्व ख्र ग्र घ्र ङ्क ङ्ख ङ्ग ङ्घ ङ्ङ च्च च्छ च्र ज्ज ज्ञ ज्र ञ्च ञ्छ ञ्ज ञ्ञ ट्ट ट्ठ ट्र ड्ड ड्ढ ड्र ण्ट ण्ठ ण्ड ण्ढ ण्ण त्त त्थ त्न त्र त्व थ्र द्द द्ध द्न द्म द्य द्र द्व ध्र न्न न्र प्त प्र प्ल फ्र ब्र भ्र म्न म्प म्प्र म्ब म्भ म्म म्र य्र ल्ल व्र श्र ष्ट स्त स्त्र स्थ स्न स्प स्फ स्म स्र ह्न ह्म ह्य ह्र ह्ल".split(' '),
    halant: "्".split(''),
    numbers: "० १ २ ३ ४ ५ ६ ७ ८ ९".split(' '),
    punctuation: "। ॥ , . ? ! : ; ' \" ( ) - _ @ # $ % & * + = / \\ < > [ ] { } | ~ ^ `".split(' ')
  },
  
  bn: {
    letters: "অ আ ই ঈ উ ঊ ঋ এ ঐ ও ঔ ক খ গ ঘ ঙ চ ছ জ ঝ ঞ ট ঠ ড ঢ ণ ত থ দ ধ ন প ফ ব ভ ম য র ল শ ষ স হ ড় ঢ় য় ৎ".split(' '),
    vowelSigns: "া ি ী ু ূ ৃ ৄ ে ৈ ো ৌ ং ঃ ঁ".split(' '),
    conjuncts: "ক্ক ক্ট ক্ত ক্ন ক্প ক্ম ক্র ক্ল ক্ষ ক্স খ্র গ্ণ গ্ধ গ্ন গ্ম গ্র গ্ল ঘ্ন ঘ্র ঙ্ক ঙ্খ ঙ্গ ঙ্ঘ ঙ্ম চ্চ চ্ছ চ্ঞ চ্র ছ্র জ্জ জ্ঝ জ্ঞ জ্র ঞ্চ ঞ্ছ ঞ্জ ঞ্ঝ ট্ট ট্র ড্ড ড্র ণ্ট ণ্ঠ ণ্ড ণ্ণ ত্ত ত্থ ত্ন ত্ম ত্র থ্র দ্দ দ্ধ দ্ন দ্ব দ্ম দ্র ধ্ন ধ্র ন্ট ন্ঠ ন্ড ন্ত ন্থ ন্দ ন্ধ ন্ন ন্ম ন্র প্ট প্ত প্ন প্প প্র প্ল প্স ফ্র ব্জ ব্দ ব্ধ ব্ব ব্র ব্ল ভ্র ম্ন ম্প ম্ফ ম্ব ম্ভ ম্ম ম্র য্র র্ক ল্ক ল্গ ল্ট ল্ড ল্প ল্ফ ল্ব ল্ম ল্ল শ্চ শ্ছ শ্ন শ্ব শ্ম শ্র শ্ল ষ্ক ষ্ট ষ্ঠ ষ্ণ ষ্প ষ্ফ ষ্ম স্ক স্খ স্ট স্ত স্থ স্ন স্প স্ফ স্ব স্ম স্র হ্ণ হ্ন হ্ম হ্র হ্ল".split(' '),
    halant: "্".split(''),
    numbers: "০ ১ ২ ৩ ৪ ৫ ৬ ৭ ৮ ৯".split(' '),
    punctuation: "। , . ? ! : ; ' \" ( ) - _ @ # $ % & * + = / \\ < > [ ] { } | ~ ^ `".split(' ')
  },
  
  or: {
    letters: "ଅ ଆ ଇ ଈ ଉ ଊ ଋ ଌ ଏ ଐ ଓ ଔ କ ଖ ଗ ଘ ଙ ଚ ଛ ଜ ଝ ଞ ଟ ଠ ଡ ଢ ଣ ତ ଥ ଦ ଧ ନ ପ ଫ ବ ଭ ମ ଯ ର ଲ ଳ ଵ ଶ ଷ ସ ହ କ୍ଷ ଜ୍ଞ".split(' '),
    vowelSigns: "ା ି ୀ ୁ ୂ ୃ ୄ େ ୈ ୋ ୌ ୍ ଂ ଃ ଁ".split(' '),
    conjuncts: "କ୍କ କ୍ଟ କ୍ତ କ୍ନ କ୍ପ କ୍ମ କ୍ର କ୍ଲ କ୍ଷ କ୍ସ ଖ୍ର ଗ୍ଣ ଗ୍ଧ ଗ୍ନ ଗ୍ମ ଗ୍ର ଗ୍ଲ ଘ୍ନ ଘ୍ର ଙ୍କ ଙ୍ଖ ଙ୍ଗ ଙ୍ଘ ଙ୍ମ ଚ୍ଚ ଚ୍ଛ ଚ୍ଞ ଚ୍ର ଛ୍ର ଜ୍ଜ ଜ୍ଝ ଜ୍ଞ ଜ୍ର ଞ୍ଚ ଞ୍ଛ ଞ୍ଜ ଞ୍ଝ ଟ୍ଟ ଟ୍ର ଡ୍ଡ ଡ୍ର ଣ୍ଟ ଣ୍ଠ ଣ୍ଡ ଣ୍ଣ ତ୍ତ ତ୍ଥ ତ୍ନ ତ୍ମ ତ୍ର ଥ୍ର ଦ୍ଦ ଦ୍ଧ ଦ୍ନ ଦ୍ବ ଦ୍ମ ଦ୍ର ଧ୍ନ ଧ୍ର ନ୍ଟ ନ୍ଠ ନ୍ଡ ନ୍ତ ନ୍ଥ ନ୍ଦ ନ୍ଧ ନ୍ନ ନ୍ମ ନ୍ର ପ୍ଟ ପ୍ତ ପ୍ନ ପ୍ପ ପ୍ର ପ୍ଲ ପ୍ସ ଫ୍ର ବ୍ଜ ବ୍ଦ ବ୍ଧ ବ୍ବ ବ୍ର ବ୍ଲ ଭ୍ର ମ୍ନ ମ୍ପ ମ୍ଫ ମ୍ବ ମ୍ଭ ମ୍ମ ମ୍ର ଯ୍ର ର୍କ ଲ୍କ ଲ୍ଗ ଲ୍ଟ ଲ୍ଡ ଲ୍ପ ଲ୍ଫ ଲ୍ବ ଲ୍ମ ଲ୍ଲ ଶ୍ଚ ଶ୍ଛ ଶ୍ନ ଶ୍ବ ଶ୍ମ ଶ୍ର ଶ୍ଲ ଷ୍କ ଷ୍ଟ ଷ୍ଠ ଷ୍ଣ ଷ୍ପ ଷ୍ଫ ଷ୍ମ ସ୍କ ସ୍ଖ ସ୍ଟ ସ୍ତ ସ୍ଥ ସ୍ନ ସ୍ପ ସ୍ଫ ସ୍ବ ସ୍ମ ସ୍ର ହ୍ଣ ହ୍ନ ହ୍ମ ହ୍ର ହ୍ଲ".split(' '),
    halant: "୍".split(''),
    numbers: "୦ ୧ ୨ ୩ ୪ ୫ ୬ ୭ ୮ ୯".split(' '),
    punctuation: "। , . ? ! : ; ' \" ( ) - _ @ # $ % & * + = / \\ < > [ ] { } | ~ ^ `".split(' ')
  },
  
  ta: {
    letters: "அ ஆ இ ஈ உ ஊ எ ஏ ஐ ஒ ஓ ஔ க ங ச ஞ ட ண த ந ப ம ய ர ல வ ழ ள ற ன ஜ ஷ ஸ ஹ க்ஷ ஸ்ரீ".split(' '),
    vowelSigns: "ா ி ீ ு ூ ெ ே ை ொ ோ ௌ ஂ ஃ".split(' '),
    conjuncts: "க்க க்ச க்ட க்த க்ப க்ம க்ர க்ல க்ஷ க்ன ங்க ங்ச ச்ச ச்ச ச்ர ஞ்ச ஞ்ஞ ட்க ட்ச ட்ட ட்ண ட்த ட்ப ட்ர ண்ட ண்ண த்க த்த த்ப த்ம த்ர ந்த ந்த ந்ந ப்ப ப்ர ம்ப ம்ம ய்ய ர்க ர்ச ர்ட ர்ந ர்ப ர்ம ர்ர ர்வ ல்க ல்ல வ்வ ழ்வ ள்ள ற்ற ன்ன".split(' '),
    grantha: "ஜ் ஷ் ஸ் ஹ் க்ஷ் ஸ்ரீ".split(' '),
    numbers: "௦ ௧ ௨ ௩ ௪ ௫ ௬ ௭ ௮ ௯".split(' '),
    punctuation: "। , . ? ! : ; ' \" ( ) - _ @ # $ % & * + = / \\ < > [ ] { } | ~ ^ `".split(' ')
  },
  
  te: {
    letters: "అ ఆ ఇ ఈ ఉ ఊ ఋ ఌ ఎ ఏ ఐ ఒ ఓ ఔ క ఖ గ ఘ ఙ చ ఛ జ ఝ ఞ ట ఠ డ ఢ ణ త థ ద ధ న ప ఫ బ భ మ య ర ల వ శ ష స హ ళ క్ష ఱ".split(' '),
    vowelSigns: "ా ి ీ ు ూ ృ ౄ ె ే ై ొ ో ౌ ం ః ఁ".split(' '),
    conjuncts: "క్క క్ష క్ర క్త క్ల క్వ ఖ్య గ్గ గ్ర గ్ల ఘ్న ఘ్ర ఙ్క ఙ్ఖ ఙ్గ ఙ్ఘ ఙ్ఙ చ్చ చ్ఛ చ్ర జ్జ జ్ఝ జ్ఞ జ్ర ట్ట ట్ర ఠ్య డ్డ డ్ఢ డ్ర ణ్ణ త్త త్థ త్న త్మ త్ర త్వ థ్ర ద్ద ద్ధ ద్బ ద్భ ద్య ద్ర ద్వ ధ్న ధ్ర ధ్వ న్న ప్ప ప్ర ప్ల ఫ్ర బ్బ బ్ర భ్ర మ్మ మ్ర య్య ర్క ర్చ ర్జ ర్ట ర్ఠ ర్త ర్థ ర్ద ర్ధ ర్న ర్ప ర్ఫ ర్బ ర్భ ర్మ ర్య ర్ర ర్ల ర్వ ర్శ ర్ష ర్స ర్హ ల్క ల్ప ల్ల వ్ర శ్చ శ్న శ్ర శ్ల ష్క ష్ట ష్ఠ ష్ణ ష్ప ష్ఫ ష్మ ష్య ష్ర స్క స్ట స్త స్థ స్న స్ప స్ఫ స్మ స్య స్ర స్వ స్స హ్న హ్మ హ్య హ్ర హ్ల ళ్ళ క్ష్ణ క్ష్మ క్ష్య క్ష్ర".split(' '),
    halant: "్".split(''),
    numbers: "౦ ౧ ౨ ౩ ౪ ౫ ౬ ౭ ౮ ౯".split(' '),
    punctuation: "। , . ? ! : ; ' \" ( ) - _ @ # $ % & * + = / \\ < > [ ] { } | ~ ^ `".split(' ')
  },
  
  pa: {
    letters: "ਅ ਆ ਇ ਈ ਉ ਊ ਏ ਐ ਓ ਔ ੳ ਕ ਖ ਗ ਘ ਙ ਚ ਛ ਜ ਝ ਞ ਟ ਠ ਡ ਢ ਣ ਤ ਥ ਦ ਧ ਨ ਪ ਫ ਬ ਭ ਮ ਯ ਰ ਲ ਵ ੜ ਸ਼ ਖ਼ ਗ਼ ਜ਼ ਫ਼ ਲ਼ ਸ ਹ".split(' '),
    vowelSigns: "ਾ ਿ ੀ ੁ ੂ ੇ ੈ ੋ ੌ ੰ ਂ ੱ".split(' '),
    conjuncts: "ੱਕ ੱਖ ੱਗ ੱਘ ੱਙ ੱਚ ੱਛ ੱਜ ੱਝ ੱਞ ੱਟ ੱਠ ੱਡ ੱਢ ੱਣ ੱਤ ੱਥ ੱਦ ੱਧ ੱਨ ੱਪ ੱਫ ੱਬ ੱਭ ੱਮ ੱਯ ੱਰ ੱਲ ੱਵ ੱੜ ੱਸ਼ ੱਖ਼ ੱਗ਼ ੱਜ਼ ੱਫ਼".split(' '),
    additionalSigns: "ੑ ੵ ੴ ੳ ੍ ੰ ੱ".split(' '),
    numbers: "੦ ੧ ੨ ੩ ੪ ੫ ੬ ੭ ੮ ੯".split(' '),
    punctuation: "। , . ? ! : ; ' \" ( ) - _ @ # $ % & * + = / \\ < > [ ] { } | ~ ^ `".split(' ')
  },
  
  kn: {
    letters: "ಅ ಆ ಇ ಈ ಉ ಊ ಋ ಌ ಎ ಏ ಐ ಒ ಓ ಔ ಕ ಖ ಗ ಘ ಙ ಚ ಛ ಜ ಝ ಞ ಟ ಠ ಡ ಢ ಣ ತ ಥ ದ ಧ ನ ಪ ಫ ಬ ಭ ಮ ಯ ರ ಲ ವ ಶ ಷ ಸ ಹ ಳ ಱ".split(' '),
    vowelSigns: "ಾ ಿ ೀ ು ೂ ೃ ೄ ೆ ೇ ೈ ೊ ೋ ೌ ಂ ಃ ಁ".split(' '),
    conjuncts: "ಕ್ಕ ಕ್ಖ ಕ್ಗ ಕ್ಘ ಕ್ಙ ಕ್ಚ ಕ್ಛ ಕ್ಜ ಕ್ಝ ಕ್ಞ ಕ್ಟ ಕ್ಠ ಕ್ಡ ಕ್ಢ ಕ್ಣ ಕ್ತ ಕ್ಥ ಕ್ದ ಕ್ಧ ಕ್ನ ಕ್ಪ ಕ್ಫ ಕ್ಬ ಕ್ಭ ಕ್ಮ ಕ್ಯ ಕ್ರ ಕ್ಲ ಕ್ವ ಕ್ಶ ಕ್ಷ ಕ್ಸ ಕ್ಹ ಕ್ಳ ಖ್ಖ ಖ್ಯ ಖ್ರ ಗ್ಗ ಗ್ಧ ಗ್ನ ಗ್ಯ ಗ್ರ ಗ್ಲ ಘ್ಯ ಘ್ರ ಙ್ಕ ಙ್ಖ ಙ್ಗ ಙ್ಘ ಙ್ಙ ಚ್ಚ ಚ್ಛ ಚ್ಯ ಚ್ರ ಛ್ಯ ಛ್ರ ಜ್ಜ ಜ್ಝ ಜ್ಞ ಜ್ಯ ಜ್ರ ಜ್ವ ಝ್ಯ ಝ್ರ ಞ್ಚ ಞ್ಛ ಞ್ಜ ಞ್ಝ ಞ್ಞ ಟ್ಟ ಟ್ಠ ಟ್ಯ ಟ್ರ ಠ್ಠ ಠ್ಯ ಠ್ರ ಡ್ಡ ಡ್ಢ ಡ್ಯ ಡ್ರ ಢ್ಢ ಢ್ಯ ಢ್ರ ಣ್ಣ ಣ್ಯ ಣ್ರ ತ್ತ ತ್ಥ ತ್ನ ತ್ಪ ತ್ಮ ತ್ಯ ತ್ರ ತ್ವ ಥ್ಯ ಥ್ರ ದ್ಗ ದ್ದ ದ್ಧ ದ್ನ ದ್ಬ ದ್ಭ ದ್ಮ ದ್ಯ ದ್ರ ದ್ವ ಧ್ನ ಧ್ಯ ಧ್ರ ಧ್ವ ನ್ನ ನ್ಯ ನ್ರ ಪ್ಪ ಪ್ಯ ಪ್ರ ಪ್ಲ ಫ್ಯ ಬ್ಬ ಬ್ಯ ಬ್ರ ಬ್ಲ ಭ್ಯ ಭ್ರ ಮ್ಪ ಮ್ಯ ಮ್ರ ಯ್ಯ ರ್ಕ ರ್ರ ಲ್ಕ ಲ್ಪ ಲ್ಯ ವ್ಯ ವ್ರ ಶ್ಚ ಶ್ರ ಶ್ಲ ಶ್ವ ಷ್ಕ ಷ್ಟ ಷ್ಣ ಷ್ಪ ಷ್ಯ ಸ್ಕ ಸ್ತ ಸ್ಥ ಸ್ನ ಸ್ಪ ಸ್ಫ ಸ್ಮ ಸ್ಯ ಸ್ರ ಸ್ವ ಹ್ಯ ಹ್ರ ಹ್ಲ ಳ್ಯ".split(' '),
    halant: "್".split(''),
    numbers: "೦ ೧ ೨ ೩ ೪ ೫ ೬ ೭ ೮ ೯".split(' '),
    punctuation: "। , . ? ! : ; ' \" ( ) - _ @ # $ % & * + = / \\ < > [ ] { } | ~ ^ `".split(' ')
  },
  
  ml: {
    letters: "അ ആ ഇ ഈ ഉ ഊ ഋ ഌ എ ഏ ഐ ഒ ഓ ഔ ക ഖ ഗ ഘ ങ ച ഛ ജ ഝ ഞ ട ഠ ഡ ഢ ണ ത ഥ ദ ധ ന പ ഫ ബ ഭ മ യ ര ല വ ശ ഷ സ ഹ ള ഴ റ".split(' '),
    vowelSigns: "ാ ി ീ ു ൂ ൃ ൄ െ േ ൈ ൊ ോ ൌ ൗ ം ഃ".split(' '),
    conjuncts: "ക്ക ക്ട ക്ത ക്ന ക്പ ക്മ ക്യ ക്ര ക്ല ക്വ ക്ഷ ഖ്യ ഖ്ര ഗ്ഗ ഗ്ദ ഗ്ധ ഗ്ന ഗ്മ ഗ്യ ഗ്ര ഗ്ല ഗ്വ ഘ്ന ഘ്യ ഘ്ര ങ്ക ങ്ങ ങ്യ ച്ച ച്ഛ ച്ഞ ച്യ ച്ര ഛ്യ ഛ്ര ജ്ജ ജ്ഞ ജ്യ ജ്ര ജ്വ ഞ്ച ഞ്ഛ ഞ്ജ ഞ്ഞ ട്ട ട്യ ട്ര ഠ്യ ഠ്ര ഡ്ഡ ഡ്ഢ ഡ്യ ഡ്ര ഢ്യ ഢ്ര ണ്ട ണ്ഠ ണ്ഡ ണ്ണ ണ്മ ണ്യ ണ്വ ത്ത ത്ഥ ത്ന ത്ബ ത്ഭ ത്മ ത്യ ത്ര ത്വ ത്സ ഥ്യ ഥ്ര ദ്ദ ദ്ധ ദ്ന ദ്ബ ദ്ഭ ദ്മ ദ്യ ദ്ര ദ്വ ധ്ന ധ്മ ധ്യ ധ്ര ധ്വ ന്ത ന്ഥ ന്ദ ന്ധ ന്ന ന്മ ന്യ ന്ര ന്വ പ്പ പ്യ പ്ര പ്ല ഫ്ര ഫ്ല ബ്ദ ബ്ധ ബ്ബ ബ്യ ബ്ര ബ്ല ഭ്യ ഭ്ര ഭ്ല മ്പ മ്മ മ്യ മ്ര മ്ല യ്യ യ്ര ര്ക ര്ച്ച ര്യ ര്ര ര്വ ല്ക ല്പ ല്യ ല്ല ല്വ വ്യ വ്ര വ്ല ശ്ച ശ്ന ശ്യ ശ്ര ശ്ല ശ്വ ഷ്ക ഷ്ട ഷ്ഠ ഷ്ണ ഷ്പ ഷ്യ ഷ്ര സ്ക സ്ത സ്ഥ സ്ന സ്പ സ്ഫ സ്മ സ്യ സ്ര സ്വ സ്സ ഹ്ന ഹ്മ ഹ്യ ഹ്ര ഹ്ല ള്ള റ്റ".split(' '),
    halant: "്".split(''),
    numbers: "൦ ൧ ൨ ൩ ൪ ൫ ൬ ൭ ൮ ൯".split(' '),
    punctuation: "। , . ? ! : ; ' \" ( ) - _ @ # $ % & * + = / \\ < > [ ] { } | ~ ^ `".split(' ')
  },
  ro: {
    letters: "aăâbcdefghiîjklmnopqrsștțuvwxyz".split(''),
    uppercase: "AĂÂBCDEFGHIÎJKLMNOPQRSȘTȚUVWXYZ".split(''),
    numbers: "0123456789".split(''),
    punctuation: ".,?!':;\"()-_@#$%&*+=/\\<>[]{}|~^`".split('')
  },
  ru: {
    letters: "абвгдеёжзийклмнопрстуфхцчшщъыьэюя".split(''),
    uppercase: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split(''),
    numbers: "0123456789".split(''),
    punctuation: ".,?!':;\"()-_@#$%&*+=/\\<>[]{}|~^`".split('')
  },
  zh: {
    common: "阿 巴 车 德 俄 佛 该 哈 伊 杰 卡 拉 马 娜 欧 帕 契 日 萨 特 乌 维 万 希 亚 子".split(' '),
    punctuation: "。 ， ？ ！ ： ； （ ） 【 】 、 · … — _ @ # ￥ % & * + = / \\ < > [ ] { } | ~ ^ `".split(' '),
    numbers: "０ １ ２ ３ ４ ５ ６ ７ ８ ９ 0 1 2 3 4 5 6 7 8 9".split(' ')
  },
  ur: {
    letters: "ا ب پ ت ٹ ث ج چ ح خ د ڈ ذ ر ڑ ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن ں و ہ ھ ء ی ے".split(' '),
    diacritics: "َ ِ ُ ّ ْ ً ٍ ٌ".split(' '),
    numbers: "۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹".split(' '),
    punctuation: "، . ؟ ! : ؛ ' \" ( ) - _ @ # $ % & * + = / \\ < > [ ] { } | ~ ^ `".split(' ')
  },
};

// Map of categories by language group
const categoryLabels: Record<string, Record<string, string>> = {
  // Latin script languages
  latin: {
    letters: "Lowercase",
    uppercase: "Uppercase",
    numbers: "Numbers",
    punctuation: "Punctuation"
  },
  // Devanagari script languages
  devanagari: {
    letters: "Letters",
    vowelSigns: "Matras",
    conjuncts: "Conjuncts",
    halant: "Halant",
    numbers: "Numbers",
    punctuation: "Punctuation"
  },
  // Arabic script languages
  arabic: {
    letters: "Letters",
    diacritics: "Diacritics",
    numbers: "Numbers",
    punctuation: "Punctuation"
  },
  // Chinese
  chinese: {
    common: "Common Characters",
    numbers: "Numbers",
    punctuation: "Punctuation"
  },
  // Tamil, Telugu, and other Dravidian languages
  dravidian: {
    letters: "Letters",
    vowelSigns: "Vowel Signs",
    conjuncts: "Conjuncts",
    halant: "Halant/Virama",
    grantha: "Grantha Letters",
    numbers: "Numbers",
    punctuation: "Punctuation"
  },
  // Gurmukhi script (Punjabi)
  gurmukhi: {
    letters: "Letters",
    vowelSigns: "Vowel Signs",
    conjuncts: "Conjuncts",
    additionalSigns: "Additional Signs",
    numbers: "Numbers",
    punctuation: "Punctuation"
  }
};

// Group languages by script type
const scriptGroups: Record<string, string[]> = {
  latin: ['en', 'es', 'fr', 'pl', 'ro', 'ru', 'de', 'cs'],
  devanagari: ['hi'], 
  bengali: ['bn'],
  odia: ['or'],
  dravidian: ['ta', 'te', 'kn', 'ml'],
  gurmukhi: ['pa'],
  arabic: ['ar', 'ur'],
  chinese: ['zh']
};

// Get category labels for a language
const getCategoryLabels = (languageId: string): Record<string, string> => {
  if (languageId === 'bn') return categoryLabels.devanagari;
  if (languageId === 'or') return categoryLabels.devanagari;
  if (languageId === 'pa') return categoryLabels.gurmukhi;
  if (['ta', 'te', 'kn', 'ml'].includes(languageId)) return categoryLabels.dravidian;
  
  for (const [script, languages] of Object.entries(scriptGroups)) {
    if (languages.includes(languageId)) {
      return categoryLabels[script];
    }
  }
  return categoryLabels.latin; // Default to latin
};

interface AlphabetHelperProps {
  languageId: string;
  onCharacterClick: (char: string) => void;
}

const AlphabetHelper: React.FC<AlphabetHelperProps> = ({ languageId, onCharacterClick }) => {
  const [activeCategory, setActiveCategory] = useState<string>('letters');
  
  // Default to English if the language isn't supported
  const langAlphabet = alphabets[languageId] || alphabets.en;
  const categories = Object.keys(langAlphabet);
  const labels = getCategoryLabels(languageId);
  
  return (
    <motion.div
      className="w-full max-w-2xl mx-auto mb-4 p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Tabs defaultValue={categories[0]} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="grid w-full mb-2" style={{ gridTemplateColumns: `repeat(${categories.length}, 1fr)` }}>
          {categories.map(category => (
            <TabsTrigger key={category} value={category} className="text-xs sm:text-sm">
              {labels[category] || category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {categories.map(category => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="flex flex-wrap justify-center gap-1">
              {langAlphabet[category].map((char, index) => (
                <motion.button
                  key={index}
                  onClick={() => onCharacterClick(char)}
                  className="min-w-8 h-8 flex items-center justify-center px-2 bg-white rounded border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-game-blue transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {char}
                </motion.button>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="mt-2 text-center text-xs text-gray-500">
        Click on any character to add it to your input
      </div>
    </motion.div>
  );
};

export default AlphabetHelper;
