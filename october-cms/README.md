# October tips & tricks

## Namespace helpers
Install https://octobercms.com/plugin/flynsarmy-idehelper and run:

```
php artisan ide-helper:generate
```

## Plugin example

Great source example to writing plugins:
https://github.com/responsiv/pay-plugin

## Good tutorials & docs

* Component basics: https://octobercms.com/docs/cms/components 
* Building plugin components: https://octobercms.com/docs/plugin/components
* Static pages api: https://octobercms.com/plugin/rainlab-pages
* Good video series on October: https://watch-learn.com/video-tutorials/making-websites-with-october-cms-part-12-repeater-field
* How to add menu on top of list controller: https://stackoverflow.com/questions/58286673/export-a-list-of-users-in-octobercms-to-csv
* How to export data: https://octobercms.com/docs/backend/import-export

## How to check if ajax request

```
// Check if ajax request
if (\Request::ajax()) {
    $this['isAjax'] = true;
} else {
    $this['isAjax'] = false;
}
```

## Building components

### How to access vars in components?

If you have _$this->message_ (and it's public) in your component class you can access it like that:

```twig
{{ __SELF__.message }}
```

## Static pages plugin

### How to get children and children of parent?
```
$this['parent'] = $this->page['apiBag']['staticPage']->getParent();
$this['children'] = $this->page['apiBag']['staticPage']->getParent()->getChildren();
```

### How to show sideselector with specific post loaded?
```
{% partial "sideselector/sideselector" 
    tagline=page.tagline 
    children=children 
    main_category=main_category 
    auto_load=true 
    post_number=3
%}
```

## Form widgets
Check: https://octobercms.com/docs/backend/forms#form-widgets

## Extending CMS forms

Add to your plugin (__warning!__ This cannot be translated):

```
    public function boot()
    {
        // Extend all backend form usage
        \Event::listen('backend.form.extendFields', function($widget) {

            // Only for the CMS Index controller
            if (!$widget->getController() instanceof \Cms\Controllers\Index) {
                return;
            }

            // Only for the Page model
            if (!$widget->model instanceof \Cms\Classes\Page) {
                return;
            }

            // Add custom fields...
            $widget->addTabFields([
                'viewBag[canonical_url]' => [
                    'label'   => 'Canonical Url',
                    'type'    => 'text',
                    'tab'     => 'cms::lang.editor.meta'
                ],
                'viewBag[robots_noindex]' => [
                    'label'   => 'No Index?',
                    'type'    => 'checkbox',
                    'tab'     => 'cms::lang.editor.meta'
                ],
            ]);
        });
    } 
```

__List of available fields you can find here:__
https://octobercms.com/docs/backend/forms#field-types

### Twig snippets 

With default value (if not set):
```
{{ page.text_color|default('#FFFFFF') }}
```

## UI

Check https://octobercms.com/docs/ui/form