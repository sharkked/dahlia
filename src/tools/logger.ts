import winston from "winston";

// const printf = winston.format.printf(({ level, message, timestamp, stack }) =>
//   winston.format.colorize().colorize(
//     level,
//     `[${timestamp}] ${level}: ${[message, stack].filter(Boolean).join(" - ")}`
//   )
// );

const printf = winston.format.printf(
  ({ level, message, timestamp, stack }) =>
    `[${timestamp}] ${level}: ${[message, stack].filter(Boolean).join(" - ")}`
);

winston.addColors({
  error: "bold red",
  warn: "yellow",
  http: "blue",
  debug: "green",
  info: "gray",
});

winston.configure({
  level: "http",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.errors({ stack: true }),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    printf
  ),
  transports: [new winston.transports.Console()],
  exceptionHandlers: [new winston.transports.Console()],
  rejectionHandlers: [new winston.transports.Console()],
});

export default winston;
