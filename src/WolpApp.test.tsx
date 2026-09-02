import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { WolpApp } from "../components/WolpApp";

afterEach(() => cleanup());

function enterApp() {
  render(<WolpApp />);
  fireEvent.click(screen.getByRole("button", { name: /Yönetim merkezine gir/i }));
}

describe("Wolp Personal AI arayüzü", () => {
  it("giriş ekranından ana Chat görünümüne geçer", () => {
    enterApp();
    expect(screen.getByRole("navigation", { name: "Ana menü" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Wolp Personal AI" })).toBeInTheDocument();
    expect(screen.getByLabelText("Aktif görev ayrıntıları")).toBeInTheDocument();
  });

  it("aktif görev panelini kapatıp yeniden açar", () => {
    enterApp();
    fireEvent.click(screen.getByRole("button", { name: "Görev panelini kapat" }));
    expect(screen.queryByLabelText("Aktif görev ayrıntıları")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Aktif görev/i }));
    expect(screen.getByLabelText("Aktif görev ayrıntıları")).toBeInTheDocument();
  });

  it("yedi ana bölüm arasında geçiş yapar", () => {
    enterApp();
    for (const page of ["Görevler", "Projeler", "Wolp", "Dosyalar", "Entegrasyonlar", "Ayarlar"]) {
      fireEvent.click(screen.getByRole("button", { name: page }));
      expect(screen.getByRole("heading", { name: page, level: 2 })).toBeInTheDocument();
    }
  });
});
