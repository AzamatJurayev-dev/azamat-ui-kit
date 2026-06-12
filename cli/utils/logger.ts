import { green, red, yellow, cyan } from "kolorist";

export const logger = {
  info(message: string) {
    console.log(cyan(message));
  },

  success(message: string) {
    console.log(green(message));
  },

  warn(message: string) {
    console.log(yellow(message));
  },

  error(message: string) {
    console.log(red(message));
  },
};