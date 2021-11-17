# October Cms snippets

Often hidden in the thicket of documentation. Gems of quick development. 

## Changle page title in .htm template

```php
function onEnd() 
{
    /** 
     * Page title.
     */
    $this->page->title = $this['builderDetails']->record->title;
}
```