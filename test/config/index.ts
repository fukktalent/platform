const config = {
  VOTING: {
      PERIOD_DURATION: 60 * 60,
      MINIMUM_QUORUM: 1_000,
  },
  STAKING: {
      DEF_SETTINGS: {
          FREEZE_PERIOD: 0,
          REWARD_PERIOD: 7 * 24 * 60 * 60,
          REWARD_PERCENT: 3,
      },
      NEW_SETTINGS: {
          FREEZE_PERIOD: 5 * 60,
          REWARD_PERIOD: 3 * 60,
          REWARD_PERCENT: 20,
      },
      STAKE_AMOUNT: 1_000,
  },
  PLATFORM: {
      SOME_AMOUNT: 1_000_000,
      REF: {
          DEF: {
              SALE_1_PERC: 50,
              SALE_2_PERC: 30,
              TRADE_1_PERC: 25,
              TRADE_2_PERC: 25,
              PERC_DECIMAL: 1,
          },
          NEW: {
              SALE_1_PERC: 150,
              SALE_2_PERC: 150,
              TRADE_1_PERC: 150,
              TRADE_2_PERC: 150,
              PERC_DECIMAL: 2,
          }
      },
  },
}

export default config;