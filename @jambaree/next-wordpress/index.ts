export * from "@nextwp/core"

const colors = {
    reset: "\x1b[0m",
    underscore: "\x1b[4m",
    yellow: "\x1b[33m",
    green: "\x1b[32m",
    red: "\x1b[31m",
}

// eslint-disable-next-line no-console -- deprecated warning
console.warn(`${colors.yellow}⚠️ DEPRECATION WARNING: The package ${colors.red}"@jambaree/next-wordpress"${colors.yellow} is deprecated and will no longer be maintained.
This package has been superseded by ${colors.green}"@nextwp/core"${colors.yellow}, rebuilding all existing functionality, and adding additional features and functionality.
${colors.reset}For more information, visit the quickstart guide here: ${colors.underscore}https://www.nextwp.org/quickstart${colors.reset}
`)