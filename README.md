# Allan Aoudji — Portfolio & E-commerce

> Portfolio personnel et boutique en ligne, construit avec Next.js, Sanity et Shopify.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Sanity](https://img.shields.io/badge/Sanity-5-red?logo=sanity)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![License](https://img.shields.io/badge/license-privé-lightgrey)

---

## 📋 Table des matières

- [Aperçu](#aperçu)
- [Stack technique](#stack-technique)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Lancer le projet](#lancer-le-projet)
- [Structure du projet](#structure-du-projet)
- [Variables d'environnement](#variables-denvironnement)
- [Scripts disponibles](#scripts-disponibles)
- [Déploiement](#déploiement)

---

## Aperçu

Site personnel combinant un portfolio (galerie de works, page about) et une boutique e-commerce
(collections, produits, panier). Le contenu est géré via **Sanity Studio** embarqué (`/studio`) et
le catalogue produit via **Shopify** (Storefront + Admin API). Le tout est rendu par **Next.js 16**
avec App Router et déployé sur **Vercel**.

---

## Stack technique

| Couche                | Technologie                                      |
| --------------------- | ------------------------------------------------ |
| Framework             | Next.js 16 (App Router)                          |
| Language              | TypeScript 5                                     |
| CMS                   | Sanity v5                                        |
| E-commerce            | Shopify (Storefront API + Admin API)             |
| Styles                | Tailwind CSS v4                                  |
| Animations            | Motion (Framer Motion)                           |
| Emails                | Resend                                           |
| Cache / Rate limiting | Upstash Redis + rate-limiter-flexible            |
| Monitoring            | Sentry, Vercel Analytics, Speed Insights         |
| Qualité code          | ESLint, Prettier, Husky, lint-staged, Commitlint |
| Déploiement           | Vercel                                           |

---

## Prérequis

- [Node.js](https://nodejs.org/) `>= 18.x`
- [npm](https://www.npmjs.com/) `>= 9.x`
- Un projet [Sanity](https://www.sanity.io/) configuré
- Une boutique [Shopify](https://www.shopify.com/) avec Storefront API et Admin API activées
- Un compte [Upstash Redis](https://upstash.com/) (rate limiting)
- Un compte [Resend](https://resend.com/) (formulaire de contact)
- Un compte [Instagram Basic Display API](https://developers.facebook.com/) (section Instagram)
- Un compte [Sentry](https://sentry.io/) (monitoring)

---

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/AllanAoudji/allanaoudji.git
cd allanaoudji

# Installer les dépendances
npm install

# Copier les variables d'environnement
cp .env.example .env.local
```

Renseigner les variables dans `.env.local` (voir [ci-dessous](#variables-denvironnement)), puis
lancer le projet.

---

## Lancer le projet

```bash
# Développement (génère les types Sanity automatiquement avant le démarrage)
npm run dev

# Build de production
npm run build

# Lancer en production
npm run start
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

Le Sanity Studio est accessible sur [http://localhost:3000/studio](http://localhost:3000/studio).

---

## Structure du projet

```
├── app/
│   ├── (back)/                     # Sanity Studio embarqué
│   │   └── studio/[[...tool]]/
│   ├── (front)/                    # Routes publiques
│   │   ├── about/
│   │   ├── collections/[handle]/
│   │   ├── contact/
│   │   ├── gallery/[slug]/
│   │   ├── products/[handle]/
│   │   ├── general-conditions-of-sale/
│   │   ├── legal-notices/
│   │   ├── privacy-policy/
│   │   └── shipping-policy/
│   └── api/revalidate/             # Webhooks Sanity & Shopify
│       ├── sanity/
│       └── shopify/
├── components/                     # Composants React (~100 composants)
├── lib/
│   ├── actions/                    # Server Actions (panier, contact…)
│   ├── contexts/                   # Contextes React (cart, lightbox, modal…)
│   ├── hooks/                      # Hooks personnalisés
│   ├── reducers/                   # Reducer panier
│   └── shopify/                    # Client Shopify (queries, mutations, fragments)
├── sanityBackend/                  # Schémas, client, queries Sanity
│   ├── schemaTypes/                # Schémas (work, about, contact, settings…)
│   └── lib/                       # Client, live queries, utilitaires
├── types/                          # Types TypeScript globaux
├── public/                         # Assets statiques (logos, og-image)
├── env.ts                          # Validation des variables d'env (Zod)
├── sanity.config.ts
└── next.config.ts
```

---

## Variables d'environnement

Copier `.env.example` en `.env.local` et renseigner les valeurs :

```bash
cp .env.example .env.local
```

### Contact & Emails — Resend

| Variable         | Description                                          |
| ---------------- | ---------------------------------------------------- |
| `CONTACT_EMAIL`  | Adresse de destination pour le formulaire de contact |
| `FROM_EMAIL`     | Adresse expéditeur des emails envoyés via Resend     |
| `RESEND_API_KEY` | Clé API Resend                                       |

### Instagram

| Variable                 | Description                               |
| ------------------------ | ----------------------------------------- |
| `INSTAGRAM_ACCESS_TOKEN` | Token d'accès Instagram Basic Display API |

### Boutique

| Variable                              | Description                                     |
| ------------------------------------- | ----------------------------------------------- |
| `NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD` | Montant minimum pour la livraison gratuite      |
| `NEXT_PUBLIC_FREE_SHIPPING_CURRENCY`  | Devise associée (ex: `EUR`)                     |
| `NEXT_PUBLIC_SHOP_ENABLED`            | Active/désactive la boutique (`true` / `false`) |

### Sanity

| Variable                        | Description                                      |
| ------------------------------- | ------------------------------------------------ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID du projet Sanity                              |
| `NEXT_PUBLIC_SANITY_DATASET`    | Dataset Sanity (ex: `production`)                |
| `SANITY_SERVER_TOKEN`           | Token de lecture Sanity (server-side uniquement) |
| `SANITY_WEBHOOK_SECRET`         | Secret pour valider les webhooks Sanity          |

### Shopify

| Variable                           | Description                                         |
| ---------------------------------- | --------------------------------------------------- |
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | Domaine public de la boutique (`xxx.myshopify.com`) |
| `SHOPIFY_STORE_DOMAIN`             | Domaine (server-side)                               |
| `SHOPIFY_PUBLIC_ACCESS_TOKEN`      | Token Storefront API (public)                       |
| `SHOPIFY_ADMIN_ACCESS_TOKEN`       | Token Admin API (server-side uniquement)            |
| `SHOPIFY_WEBHOOK_SECRET`           | Secret pour valider les webhooks Shopify            |

### Monitoring — Sentry

| Variable                     | Description                                |
| ---------------------------- | ------------------------------------------ |
| `NEXT_PUBLIC_SENTRY_DSN`     | DSN public du projet Sentry                |
| `NEXT_PUBLIC_SENTRY_ENABLED` | Active/désactive Sentry (`true` / `false`) |
| `SENTRY_AUTH_TOKEN`          | Token d'auth Sentry (source maps)          |
| `SENTRY_ORG`                 | Slug de l'organisation Sentry              |
| `SENTRY_PROJECT`             | Slug du projet Sentry                      |

### Divers

| Variable                      | Description                                          |
| ----------------------------- | ---------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`        | URL publique du site (ex: `https://allanaoudji.com`) |
| `NEXT_PUBLIC_TWITTER_CREATOR` | Handle Twitter/X (ex: `@allanaoudji`)                |
| `UPSTASH_REDIS_REST_URL`      | URL REST de l'instance Upstash Redis                 |
| `UPSTASH_REDIS_REST_TOKEN`    | Token d'accès Redis                                  |

> Toutes ces variables sont validées au démarrage via **Zod** (`env.ts`). Le serveur refusera de
> démarrer si l'une d'elles est manquante.

---

## Scripts disponibles

| Commande              | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| `npm run dev`         | Lance le serveur de dev (avec typegen Sanity automatique)    |
| `npm run build`       | Compile pour la production (avec typegen Sanity automatique) |
| `npm run start`       | Démarre le serveur de production                             |
| `npm run clean`       | Supprime le cache `.next`                                    |
| `npm run clean:build` | Nettoie le cache puis rebuild                                |
| `npm run typegen`     | Extrait le schéma Sanity et génère les types TypeScript      |
| `npm run type-check`  | Vérifie les types TypeScript                                 |
| `npm run format`      | Formate tout le code avec Prettier                           |

---

## Déploiement

### Vercel (recommandé)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AllanAoudji/allanaoudji)

1. Importer le dépôt sur [Vercel](https://vercel.com)
2. Configurer toutes les variables d'environnement listées ci-dessus
3. Déployer — Vercel détecte automatiquement Next.js

> **Note :** Le Sanity Studio est embarqué dans l'app (`/studio`) et se déploie avec le reste du
> projet. Aucun hébergement séparé nécessaire.
>
> **Note :** Configurer les webhooks Sanity et Shopify pour pointer vers `/api/revalidate/sanity` et
> `/api/revalidate/shopify` afin d'activer la revalidation du cache à la publication.
