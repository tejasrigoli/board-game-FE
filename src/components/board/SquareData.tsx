import { SquareType } from "./SquareType";
import { BoardSection } from "./BoardSection";

interface SquareConfigData {
  readonly type: SquareType;
  readonly section: BoardSection;
  readonly groupId?: number;
}

const squareGroupColorMap = new Map<number, string>([
  [1, "grey"], [2, "orange"], [3, "red"], [4, "grey"], [5, "orange"], [6, "grey"], [7, "red"], [8, "grey"],
  [15, "orange"]
]);

const squareGroupColorMapCaps = new Map<number, string>([
  [1, "GREY"], [2, "ORANGE"], [3, "RED"], [4, "GREY"], [5, "ORANGE"], [6, "GREY"], [7, "RED"], [8, "GREY"],
  [15, "ORANGE"]
]);



const SquareConfigData = new Map<number, SquareConfigData>();
SquareConfigData.set(1, { type: SquareType.Go, section: BoardSection.Bottom });
SquareConfigData.set(2, { type: SquareType.Property, section: BoardSection.Bottom, groupId: 1 });
SquareConfigData.set(3, { type: SquareType.Chance, section: BoardSection.Bottom });
SquareConfigData.set(4, { type: SquareType.Property, section: BoardSection.Bottom, groupId: 1 });
SquareConfigData.set(5, { type: SquareType.Property, section: BoardSection.Bottom, groupId: 15 });

SquareConfigData.set(6, { type: SquareType.Bug, section: BoardSection.Bottom, groupId: 10 });

SquareConfigData.set(7, { type: SquareType.Property, section: BoardSection.Bottom, groupId: 2 });
SquareConfigData.set(8, { type: SquareType.Chance, section: BoardSection.Bottom });
SquareConfigData.set(9, { type: SquareType.Property, section: BoardSection.Bottom, groupId: 2 });
SquareConfigData.set(10, { type: SquareType.Property, section: BoardSection.Bottom, groupId: 2 });

SquareConfigData.set(11, { type: SquareType.Turn, section: BoardSection.Bottom });

SquareConfigData.set(12, { type: SquareType.Property, section: BoardSection.Left, groupId: 3 });
SquareConfigData.set(13, { type: SquareType.Chance, section: BoardSection.Left });
SquareConfigData.set(14, { type: SquareType.Property, section: BoardSection.Left, groupId: 3 });
SquareConfigData.set(15, { type: SquareType.Property, section: BoardSection.Left, groupId: 3 });

SquareConfigData.set(16, { type: SquareType.Bug, section: BoardSection.Left, groupId: 10 });

SquareConfigData.set(17, { type: SquareType.Property, section: BoardSection.Left, groupId: 4 });
SquareConfigData.set(18, { type: SquareType.PitStop, section: BoardSection.Left });
SquareConfigData.set(19, { type: SquareType.Property, section: BoardSection.Left, groupId: 4 });
SquareConfigData.set(20, { type: SquareType.Property, section: BoardSection.Left, groupId: 4 });

SquareConfigData.set(21, { type: SquareType.Turn, section: BoardSection.Top });

SquareConfigData.set(22, { type: SquareType.Property, section: BoardSection.Top, groupId: 5 });
SquareConfigData.set(23, { type: SquareType.Chance, section: BoardSection.Top });
SquareConfigData.set(24, { type: SquareType.Property, section: BoardSection.Top, groupId: 5 });
SquareConfigData.set(25, { type: SquareType.Property, section: BoardSection.Top, groupId: 5 });

SquareConfigData.set(26, { type: SquareType.Bug, section: BoardSection.Top, groupId: 10 });

SquareConfigData.set(27, { type: SquareType.Property, section: BoardSection.Top, groupId: 6 });
SquareConfigData.set(28, { type: SquareType.Chance, section: BoardSection.Top });
SquareConfigData.set(29, { type: SquareType.Property, section: BoardSection.Top, groupId: 6 });
SquareConfigData.set(30, { type: SquareType.Property, section: BoardSection.Top, groupId: 6 });

SquareConfigData.set(31, { type: SquareType.Turn, section: BoardSection.Top });

SquareConfigData.set(32, { type: SquareType.Property, section: BoardSection.Right, groupId: 7 });
SquareConfigData.set(33, { type: SquareType.Chance, section: BoardSection.Right });
SquareConfigData.set(34, { type: SquareType.Property, section: BoardSection.Right, groupId: 7 });
SquareConfigData.set(35, { type: SquareType.Property, section: BoardSection.Right, groupId: 7 });

SquareConfigData.set(36, { type: SquareType.Bug, section: BoardSection.Right, groupId: 10 });

SquareConfigData.set(37, { type: SquareType.PitStop, section: BoardSection.Right });

SquareConfigData.set(38, { type: SquareType.Property, section: BoardSection.Right, groupId: 8 });
SquareConfigData.set(39, { type: SquareType.Chance, section: BoardSection.Right });
SquareConfigData.set(40, { type: SquareType.Property, section: BoardSection.Right, groupId: 8 });

export { SquareConfigData, squareGroupColorMap, squareGroupColorMapCaps };