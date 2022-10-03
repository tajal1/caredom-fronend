# Registration business logic

1. Mail/mobile number required
2. Generate 6 digit auto code
3. Verification & set time limit.
4. Password & Password confirmation.
   --Registartion sucess

## sucess responce

<!-- {
    success: boolean,
    code: string, // Waris custom error message codes
    message: string,
    /**
    * - POST: object
    * - GET: array | object
    * - PUT: object
    * - PATCH: object
    * - DELETE: object | null
    */
    data: array | object | null
} -->

## Error responce

<!-- {
    success: boolean,
    code: string, // Waris custom error message codes
    message: string,
    errors: [
        {
            type: 'system' | 'validation' | ..., // waris custom error type
            values: [
                {
                    msg: string,
                    code: string // Waris custom error message codes
                }, // ...
            ]
        }, // ...
    ]
} -->
