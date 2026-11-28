import { describe, expect, it } from "vitest";
import { communityAuthority } from "./authority";
import geography from "./brazil-states.json";

describe("Indicadores confirmados da comunidade GLP", () => {
  it("representa mais de 400 integrantes como 400+", () => expect(communityAuthority.minimumMembers).toBe(400));
  it("tem representantes em 25 de 27 UFs", () => {
    expect(communityAuthority.representedStates).toBe(25);
    expect(communityAuthority.totalStates).toBe(27);
    expect(geography.states).toHaveLength(27);
    expect(new Set(geography.states.map((state) => state.code)).size).toBe(27);
    expect(geography.states.filter((state) => !communityAuthority.unrepresentedStates.includes(state.code))).toHaveLength(25);
  });
  it("exclui somente Acre e Amapá da cobertura", () => expect(communityAuthority.unrepresentedStates).toEqual(["AC", "AP"]));
  it("informa 92,6% de cobertura", () => {
    expect(communityAuthority.coveragePercent).toBe(92.6);
    expect(Number((25 / 27 * 100).toFixed(1))).toBe(communityAuthority.coveragePercent);
  });
  it("está presente nas cinco regiões", () => expect(communityAuthority.regions).toBe(5));
  it("não confunde integrantes com clientes contratantes", () => expect(communityAuthority.scope).toBe("community"));
  it("direciona exclusivamente ao cadastro existente", () => expect(communityAuthority.destination).toBe("/comunidade"));
});