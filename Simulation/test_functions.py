import unittest

from Functions import punishment


class PunishmentTests(unittest.TestCase):
    def test_punishment_returns_updated_daily_earnings(self):
        result = punishment(100)
        self.assertIsInstance(result, int)
        self.assertGreaterEqual(result, 0)


if __name__ == "__main__":
    unittest.main()
