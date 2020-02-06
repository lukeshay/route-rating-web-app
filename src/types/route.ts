export interface Route {
  averageGrade: string;
  averageRating: number;
  gymId: string;
  holdColor: string;
  id: string;
  name: string;
  setter: string;
  types: Array<"BOULDER" | "TOP_ROPE" | "LEAD" | "AUTO_BELAY">;
  wallId: string;
}
