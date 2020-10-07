This is an express server for a PG Database.

The core functionality provides CRUD operations to 4 basic data tables:

    1. User 
    2. Trip
    3. Activity
    4. Rental

These tables use O2M relations as follows:

    -A user can have many trips, activities and rentals.

    -A trip can have many activities and rentals.

    -An activity can have many rentals.

The reasoning for these relations is that a user may want to:

-travel somewhere without doing an activity (go to an event, run a marathon, etc.) or renting a product or service (tools, transport, etc.)

-Go to an activity without traveling somewhere or renting something.

-Rent a product or service without having to travel somewhere or go to an activity

