# Eloquent cheatsheet

## Convert any model to array

```php
/** @var array $result */
$result = StatsSubscriptions::first()->toArray();
```

## Advanced aggregation queries

```php
/** @var object $model */
$model = StatsSubscriptions::select(
        DB::raw('YEAR(date) year'),
        DB::raw('WEEKOFYEAR(date) week'),
        DB::raw('SUM(new) new'),
        DB::raw('SUM(cancel) cancel'),
        DB::raw('SUM(system_cancel) system_cancel'),
        DB::raw('SUM(final_cancel) final_cancel'),
        DB::raw('SUM(returned_to_live) returned_to_live'),
        DB::raw('SUM(user_has_new_subscription) user_has_new_subscription'),
        DB::raw('SUM(amount_cancelled) amount_cancelled'),
        DB::raw('SUM(amount_new) amount_new'),
        DB::raw('SUM(successful_payments_count) successful_payments_count'),
        DB::raw('SUM(successful_payments_sum) successful_payments_sum'),
        DB::raw('SUM(unsuccessful_payments_count) unsuccessful_payments_count'),
        DB::raw('SUM(unsuccessful_payments_sum) unsuccessful_payments_sum'),
    )
    ->groupBy('year', 'week')
    ->orderBy('year', $datesOrder)
    ->orderBy('week', $datesOrder)
    ->whereBetween('date', [$start, $end])
    ->get();
```
