export class Weather {
  name: string;
  temperature: number;
  description: string;
  icon: string;
  windSpeed: number;

  constructor(name: string, temperature: number, description: string, icon: string, windSpeed: number) {
    this.name = name;
    this.temperature = temperature;
    this.description = description;
    this.icon = icon;
    this.windSpeed = windSpeed;
  }
}
