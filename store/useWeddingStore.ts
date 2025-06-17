import { create } from "zustand";

type CoupleData = {
  groomName: string;
  brideName: string;
  groomInstagram?: string;
  brideInstagram?: string;
  groomPhoto?: File | null;
  bridePhoto?: File | null;
};

type ParentsData = {
  groomFather: string;
  groomMother: string;
  brideFather: string;
  brideMother: string;
};

type VerseData = {
  verseText: string;
  verseSource: string;
};

type EventDetail = {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  street: string;
  fullAddress: string;
  mapUrl?: string;
};

type MediaData = {
  heroImage?: File | null;
  invitationBackground?: File | null;
  closingImage?: File | null;
};

type ClosingData = {
  closingTitle: string;
  closingMessage: string;
};

type WeddingState = {
  couple: CoupleData;
  parents: ParentsData;
  verse: VerseData;
  events: EventDetail[]; // bisa lebih dari 1 acara
  media: MediaData;
  closing: ClosingData;
  updateCouple: (data: Partial<CoupleData>) => void;
  updateParents: (data: Partial<ParentsData>) => void;
  updateVerse: (data: Partial<VerseData>) => void;
  updateEvents: (events: EventDetail[]) => void;
  updateMedia: (data: Partial<MediaData>) => void;
  updateClosing: (data: Partial<ClosingData>) => void;
};

export const useWeddingStore = create<WeddingState>((set) => ({
  couple: {
    groomName: "",
    brideName: "",
    groomInstagram: "",
    brideInstagram: "",
    groomPhoto: null,
    bridePhoto: null,
  },
  parents: {
    groomFather: "",
    groomMother: "",
    brideFather: "",
    brideMother: "",
  },
  verse: {
    verseText: "",
    verseSource: "",
  },
  events: [],
  media: {
    heroImage: null,
    invitationBackground: null,
    closingImage: null,
  },
  closing: {
    closingTitle: "",
    closingMessage: "",
  },
  updateCouple: (data) =>
    set((state) => ({ couple: { ...state.couple, ...data } })),
  updateParents: (data) =>
    set((state) => ({ parents: { ...state.parents, ...data } })),
  updateVerse: (data) =>
    set((state) => ({ verse: { ...state.verse, ...data } })),
  updateEvents: (events) => set(() => ({ events })),
  updateMedia: (data) =>
    set((state) => ({ media: { ...state.media, ...data } })),
  updateClosing: (data) =>
    set((state) => ({ closing: { ...state.closing, ...data } })),
}));
