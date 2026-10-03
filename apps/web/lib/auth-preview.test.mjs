import assert from "node:assert/strict"
import { test } from "node:test"
import {
  normalizeIdentity,
  maskIdentity,
  createPreviewChallenge,
  checkPreviewOtp,
  canResetPreviewPassword,
  PREVIEW_OTP_LIFETIME_MS,
} from "./auth-preview.ts"

test("nomor HP lokal dan internasional menjadi identitas yang sama", () => {
  for (const phone of [
    "0812 3456 7890",
    "+62 812-3456-7890",
    "6281234567890",
  ]) {
    assert.equal(normalizeIdentity("traveler", phone), "+6281234567890")
  }
  for (const phone of [
    "",
    "0812abc34567890",
    "+6281",
    "nama@email.com",
    "+1 81234567890",
    "0812345678901234",
  ]) {
    assert.equal(normalizeIdentity("traveler", phone), null)
  }
})

test("kanal identitas pemandu memakai email yang valid", () => {
  assert.equal(normalizeIdentity("guide", " Nama@Email.COM "), "nama@email.com")
  for (const email of [
    "",
    "081234567890",
    "nama@",
    "nama @email.com",
    "nama@email",
  ]) {
    assert.equal(normalizeIdentity("guide", email), null)
  }
})

test("tujuan OTP disamarkan untuk kedua kanal", () => {
  assert.equal(maskIdentity("traveler", "+6281234567890"), "+6281••••890")
  assert.equal(maskIdentity("guide", "nama@email.com"), "na•••@email.com")
})

test("OTP salah, kedaluwarsa, dan sudah dipakai tidak diterima", () => {
  const challenge = createPreviewChallenge(
    "traveler",
    "+6281234567890",
    "reset",
    1000
  )
  assert.equal(checkPreviewOtp(challenge, "1234", 1001), "valid")
  assert.equal(checkPreviewOtp(challenge, "0000", 1001), "incorrect")
  assert.equal(checkPreviewOtp(challenge, "123", 1001), "incorrect")
  assert.equal(
    checkPreviewOtp(challenge, "1234", 1000 + PREVIEW_OTP_LIFETIME_MS),
    "expired"
  )
  assert.equal(
    checkPreviewOtp({ ...challenge, verified: true }, "1234", 1001),
    "used"
  )
})

test("sandi baru hanya setelah OTP pemulihan terverifikasi dan belum kedaluwarsa", () => {
  const challenge = createPreviewChallenge(
    "guide",
    "nama@email.com",
    "reset",
    1000
  )
  assert.equal(canResetPreviewPassword(null, 1001), false)
  assert.equal(canResetPreviewPassword(challenge, 1001), false)
  assert.equal(
    canResetPreviewPassword({ ...challenge, verified: true }, 1001),
    true
  )
  assert.equal(
    canResetPreviewPassword(
      { ...challenge, verified: true, flow: "register" },
      1001
    ),
    false
  )
  assert.equal(
    canResetPreviewPassword(
      { ...challenge, verified: true },
      1000 + PREVIEW_OTP_LIFETIME_MS
    ),
    false
  )
})

test("kirim ulang membuat tantangan baru tanpa membawa status verifikasi", () => {
  const old = {
    ...createPreviewChallenge("guide", "nama@email.com", "reset", 1000),
    verified: true,
  }
  const renewed = createPreviewChallenge(
    old.role,
    old.identity,
    old.flow,
    400000
  )
  assert.equal(renewed.verified, false)
  assert.equal(checkPreviewOtp(renewed, "1234", 400001), "valid")
  assert.equal(canResetPreviewPassword(renewed, 400001), false)
})
