from decimal import Decimal

# social security insurance :: bảo hiểm xã hội
SI = Decimal('0.105')

# personal deduction :: giảm trừ bản thân
PD = Decimal('11000000')

# dependent deduction :: giảm trừ người phụ thuộc
DD = Decimal('4400000')

# PIT rules :: biểu thuế lũy tiến
PIT_RULES = [
    {'range': (Decimal('0'), Decimal('5000000')), 'pct': Decimal('0.05'), 'sub': Decimal('0')},
    {'range': (Decimal('5000000'), Decimal('10000000')), 'pct': Decimal('0.10'), 'sub': Decimal('250000')},
    {'range': (Decimal('10000000'), Decimal('18000000')), 'pct': Decimal('0.15'), 'sub': Decimal('750000')},
    {'range': (Decimal('18000000'), Decimal('32000000')), 'pct': Decimal('0.20'), 'sub': Decimal('1650000')},
    {'range': (Decimal('32000000'), Decimal('52000000')), 'pct': Decimal('0.25'), 'sub': Decimal('3250000')},
    {'range': (Decimal('52000000'), Decimal('80000000')), 'pct': Decimal('0.30'), 'sub': Decimal('5850000')},
    {'range': (Decimal('80000000'), Decimal('999999999999')), 'pct': Decimal('0.35'), 'sub': Decimal('9850000')},
]