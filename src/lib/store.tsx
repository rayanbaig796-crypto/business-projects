import React, { createContext, useContext, useState, useMemo } from "react";
import { type InvitationData } from "@/components/InvitationPreview";
import { TEMPLATES, getTemplate } from "./templates";

const DEFAULT_DATA: InvitationData = {
  bride: "Aanya",
  groom: "Vihaan",
  date: "2026-12-12",
  time: "18:30",
  venue: "The Leela Palace, Udaipur, Rajasthan",
  mapsLink: "",
  brideImg: null,
  groomImg: null,
  font: "serif",
};

type StoreContextType = {
  data: InvitationData;
  updateData: <K extends keyof InvitationData>(key: K, value: InvitationData[K]) => void;
  templateId: string;
  setTemplateId: (id: string) => void;
  template: ReturnType<typeof getTemplate>;
};

const StoreContext = createContext<StoreContextType | null>(null);

export function InvitationProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<InvitationData>(DEFAULT_DATA);
  const [templateId, setTemplateId] = useState<string>(TEMPLATES[0].id);

  const updateData = <K extends keyof InvitationData>(key: K, value: InvitationData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const template = useMemo(() => getTemplate(templateId), [templateId]);

  return (
    <StoreContext.Provider value={{ data, updateData, templateId, setTemplateId, template }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useInvitationStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useInvitationStore must be used within an InvitationProvider");
  }
  return ctx;
}
