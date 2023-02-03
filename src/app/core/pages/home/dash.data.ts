import { ChartType, Row } from "angular-google-charts";


export const UserSistema: ChartInterface = {
  type: ChartType.PieChart,
  options: {
    pieHole: 0.2,
  }
}

export interface ChartInterface {
  title?: string;
  width?: string;
  data?: any[];
  height?: string;
  type?: any;
  options?: object;
  columns?: string[]
}
