import "server-only";

import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

// Cache on globalThis so dev hot reloads don't call Firestore#settings twice.
const globalForFirebase = globalThis as typeof globalThis & { __smcFirestore?: Firestore };

function credentials() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  // Env files store the key on one line with literal "\n" sequences.
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  return projectId && clientEmail && privateKey ? { projectId, clientEmail, privateKey } : null;
}

export function isFirebaseAdminConfigured() {
  return credentials() !== null;
}

function adminApp(): App {
  const existing = getApps()[0];
  if (existing) return existing;

  const serviceAccount = credentials();
  if (!serviceAccount) {
    throw new Error(
      "Firebase Admin is not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY.",
    );
  }
  return initializeApp({ credential: cert(serviceAccount) });
}

export function db() {
  if (!globalForFirebase.__smcFirestore) {
    const firestore = getFirestore(adminApp());
    firestore.settings({ ignoreUndefinedProperties: true });
    globalForFirebase.__smcFirestore = firestore;
  }
  return globalForFirebase.__smcFirestore;
}

export function adminAuth() {
  return getAuth(adminApp());
}
