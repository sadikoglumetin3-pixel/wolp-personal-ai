import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { App } from "./App";

afterEach(() => cleanup());

describe("Wolp demo sitesi", () => {
  it("ana içeriği ve temel semantik bölgeleri gösterir", () => {
    render(<App />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /İşlerin sen dinlenirken de akışta kalsın/i,
      }),
    ).toBeInTheDocument();
  });

  it("ana navigasyon bağlantılarını sunar", () => {
    render(<App />);

    const navigation = screen.getByRole("navigation", { name: "Ana menü" });
    expect(navigation).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Özellikler" })).toHaveAttribute("href", "#ozellikler");
    expect(screen.getByRole("link", { name: "Nasıl çalışır?" })).toHaveAttribute("href", "#nasil-calisir");
    expect(screen.getByRole("link", { name: "Güvenlik" })).toHaveAttribute("href", "#guvenlik");
  });

  it("mobil menü durumunu erişilebilir biçimde değiştirir", () => {
    render(<App />);

    const menuButton = screen.getByRole("button", { name: "Menüyü aç" });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(menuButton);

    const closeButton = screen.getByRole("button", { name: "Menüyü kapat" });
    expect(closeButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("navigation", { name: "Ana menü" })).toHaveClass("is-open");

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.getByRole("button", { name: "Menüyü aç" })).toHaveAttribute("aria-expanded", "false");
  });

  it("menü bağlantısı seçildiğinde mobil menüyü kapatır", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Menüyü aç" }));
    fireEvent.click(screen.getByRole("link", { name: "Özellikler" }));

    expect(screen.getByRole("button", { name: "Menüyü aç" })).toHaveAttribute("aria-expanded", "false");
  });

  it("özellikleri, iş akışı adımlarını ve güvenlik mesajını gösterir", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Tek merkezden yönet" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "AI iş akışları oluştur" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Kontrol sende kalsın" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Ne istediğini anlat" })).toBeInTheDocument();
    expect(screen.getByText("Kritik kararlar otomatikleşmez.")).toBeInTheDocument();
  });

  it("kritik çağrı bağlantılarını demo alanına yönlendirir", () => {
    render(<App />);

    const demoLinks = screen.getAllByRole("link", { name: /örnek alanı|demoyu keşfet/i });
    expect(demoLinks.length).toBeGreaterThanOrEqual(2);
    for (const link of demoLinks) {
      expect(link).toHaveAttribute("href", "#demo");
    }
  });
});
