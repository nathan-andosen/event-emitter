
# 2.0.0

__Breaking changes:__

EmittableEvents class on() function has changed:

```javascript
// version 1.x.x 
.on(eventName: string, fn: Function, uniqueId?: string)

// versoin 2.x.x
.on(eventName: string, fn: Function, options?: iEmittableEventsOnOptions);
// check the /src/emittable-events.ts file for the iEmittableEventsOnOptions interface
```

__Added:__

* Added the ability to set the scope of the "this" keyword in the on() function for the EmittableEvents class. Check the README for more information

# 1.1.0

__Added:__

* Added EmittableEvents abstract class, see README docs for more information

# 1.0.0

Initial release.