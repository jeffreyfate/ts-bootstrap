import {LFService, LoggerFactory, LoggerFactoryOptions, LogGroupRule, LogLevel} from "typescript-logging";

const options =
  new LoggerFactoryOptions()
  .addLogGroupRule(new LogGroupRule(new RegExp(".+"), LogLevel.Info));

export const ConfigFactory = LFService.createNamedLoggerFactory("LoggerFactory", options);
