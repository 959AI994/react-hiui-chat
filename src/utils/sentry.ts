import * as Sentry from '@sentry/react'

// 接入文档：https://xiaomi.f.mioffice.cn/docx/doxk413WDDlrRu474VejR52niBe
Sentry.init({
  dsn: 'your dsn',
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
  release: process.env.CI_COMMIT_TAG,
  environment: process.env.NODE_ENV,
})
