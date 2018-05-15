
# Vote JSON

## Title Key
1. T - Teacher
2. S - Student
3. A - advisor

### Number 
key title in table (number)

### ID
subject id (string)

### Vote
vote setting, default is random with normal output (object)

#### Keys
1. type - random | custom (string) 
2. random - if type === random, accept: good | normal | bad (string) 
3. custom - if type === custom, accept: array of number in range 1..5 inclusive (array) 
4. comment - null or string of comment (string) 

## Example

```json
{
    "T": [
        {
            "number": 1,
            "id": "01204352",
            "vote": {
                "type": "random",
                "random": "good", // normal | bad
                "comment": null
            }
        }
    ],
    "S": [
        {
            "number": 2,
            "id": "01204482",
            "vote": {
                "type": "custom",
                "custom": [
                    4,
                    4,
                    3,
                    5,
                    5,
                    3
                ],
                "comment": null
            }
        }
    ],
    "A": [
        {}  
    ]
}
```