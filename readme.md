### Payment management

```

+-------------------+        +-------------------+        +--------------------+
|      USER         | -----> |      BACKEND      | -----> |     STRIPE         |
|                   |        |                   |        |                    |
| Initiates Payment |        | Create Payment    |        | Process Payment    |
|                   |        | Save Booking Info |        | Store Funds in     |
|                   |        |                   |        | Admin Account      |
+-------------------+        +-------------------+        +--------------------+
                                                           
                               |
                               |
                               v
                                                           
+-------------------+        +-------------------+        +--------------------+
|       HOST        | -----> |      BACKEND      | -----> |     STRIPE         |
|                   |        | Create Host       |        | Create Custom      |
| Register Details  |        | Account           |        | Host Account       |
|                   |        | Verify Bank Info  |        | Save Account Info  |
+-------------------+        +-------------------+        +--------------------+
                                                           
                               |
                               |
                               v
                                                           
+-------------------+        +-------------------+        +--------------------+
|     ADMIN         | -----> |      BACKEND      | -----> |     STRIPE         |
| Marks Booking     |        | Transfer Payment  |        | Transfer Funds to  |
| Completed         |        | to Host           |        | Host's Bank Account|
+-------------------+        +-------------------+        +--------------------+

```
