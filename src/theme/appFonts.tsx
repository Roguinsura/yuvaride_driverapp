type AppFonts = {
  bold: string
  medium: string
  regular: string
}

/*
  Roboto, matching theme/appTypography.

  These three names are used as `fontFamily:` by screens that have not yet moved
  onto the typography tokens. Pointing them at Roboto means the whole app shows
  one typeface during the migration instead of Roboto on migrated screens and
  GTWalsheimPro everywhere else.

  Only the family changes. Screens still using this map keep the old
  windowWidth()-relative sizes; the tokens are what fix sizing. This is an
  interim measure, not a substitute for migrating a screen.

  WHY THE THREE VALUES ARE SOURCED DIFFERENTLY
  --------------------------------------------
  Android exposes system aliases for regular (`sans-serif`) and medium
  (`sans-serif-medium`), but there is no bold alias. Callers here set only
  fontFamily, not fontWeight, so an alias-only mapping would silently render
  every bold string at regular weight.

  Regular and Bold are therefore bundled as real files (Roboto is Apache-2.0
  and freely redistributable), while Medium uses the system alias — Roboto IS
  Android's system sans-serif, so `sans-serif-medium` is genuine Roboto Medium
  and needs no file.

  iOS: the bundled two resolve once listed in Info.plist UIAppFonts. There is no
  `sans-serif-medium` on iOS, so `medium` falls back to the system face until a
  Roboto-Medium.ttf is added here — Windows ships only Regular and Bold, which
  is why it is not bundled already.

  Adding Roboto-Medium.ttf later is a drop-in: put it beside these files, add it
  to android/app/src/main/assets/fonts, and change `medium` to 'Roboto-Medium'.
*/
const appFonts: AppFonts = {
  bold: 'Roboto-Bold',
  medium: 'sans-serif-medium',
  regular: 'Roboto-Regular',
}

export default appFonts
