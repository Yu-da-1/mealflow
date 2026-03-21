import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  eslintConfigPrettier,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),

  // domain層: DB・HTTP・repository への依存を禁止
  {
    files: ["src/domain/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@supabase/*", "@/server/*"],
              message: "domain層からDB・インフラ層のimportは禁止です",
            },
            {
              group: ["next/*", "next"],
              message: "domain層からNext.jsのimportは禁止です",
            },
          ],
        },
      ],
    },
  },

  // features層: supabase直接importを禁止（APIルート経由で使う）
  {
    files: ["src/features/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@supabase/*", "@/server/*"],
              message:
                "UI層からDB・インフラ層を直接importしないでください。API経由で利用してください",
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
