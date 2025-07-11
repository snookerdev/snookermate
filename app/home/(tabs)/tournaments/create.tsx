import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CreateTournament() {
    const defaultTournament = {
        name: '',
        //startDate: new Date(),
        numberOfPlayers: 8,
        venue: '',
        description: '',
        fee: 0
    };
    const [tournament, setTournament] = useState(defaultTournament);
    const [errors, setErrors] = useState<string[]>([]);
    //const [showDatePicker, setShowDatePicker] = useState(false);

    function saveTournament(tournament: typeof defaultTournament) {
        const validationErrors = getValidationErrors();
        setErrors(validationErrors);
        if (validationErrors.length > 0) {
            return;
        }
    }

    function getValidationErrors(): string[] {
        const errors: string[] = [];
        if (tournament.name.trim() === '') {
            errors.push('name.empty');
        }
        if (tournament.venue.trim() === '') {
            errors.push('venue.empty');
        }
        if (tournament.fee < 0) {
            errors.push('fee.invalid');
        }
        return errors;
    }

    return (
        <View className="flex-1 m-4">
            <View className="my-1">
                <Text className="mb-1 text-base font-medium text-gray-800">Name</Text>
                <TextInput
                    className="h-11 px-3 border border-gray-300 rounded-md"
                    placeholder="Winter Snooker Tournament"
                    onChangeText={(name) => setTournament(prev => ({ ...prev, name }))}
                    value={tournament.name}
                    autoCapitalize="none"
                />
                {errors.includes('name.empty') && (<Text className="mb-1 text-base font-medium text-red-600">Name cannot be blank</Text>)}
            </View>
            {/* <View className="my-1">
                <Text className="mb-1 text-base font-medium text-gray-800">Start Date</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} className="h-11 px-3 border border-gray-300 rounded-md justify-center">
                    <Text>{tournament.startDate.toLocaleString()}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={tournament.startDate}
                        mode="datetime"
                        display="default"
                        onChange={(event, date) => {
                            setShowDatePicker(false);
                            if (date) setTournament(prev => ({ ...prev, startDate: date }));
                        }}
                    />
                )}
            </View> */}
            <View className="my-1">
                <Text className="mb-1 text-base font-medium text-gray-800">Number of Players</Text>
                <View className="flex-row space-x-4">
                    {[8, 16, 32].map(num => (
                        <TouchableOpacity
                            key={num}
                            className={`px-4 py-2 border rounded-md ${tournament.numberOfPlayers === num ? 'bg-green-600 border-green-600' : 'border-gray-300'}`}
                            onPress={() => setTournament(prev => ({ ...prev, numberOfPlayers: num }))}
                        >
                            <Text className={tournament.numberOfPlayers === num ? 'text-white' : 'text-gray-800'}>{num}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View className="my-1">
                <Text className="mb-1 text-base font-medium text-gray-800">Venue</Text>
                <TextInput
                    className="h-11 px-3 border border-gray-300 rounded-md"
                    placeholder="Venue"
                    onChangeText={(venue) => setTournament(prev => ({ ...prev, venue }))}
                    value={tournament.venue}
                    autoCapitalize="none"
                />
                {errors.includes('venue.empty') && (<Text className="mb-1 text-base font-medium text-red-600">Venue cannot be blank</Text>)}
            </View>
            <View className="my-1">
                <Text className="mb-1 text-base font-medium text-gray-800">Description</Text>
                <TextInput
                    className="min-h-36 px-3 border border-gray-300 rounded-md"
                    placeholder="Description"
                    onChangeText={(description) => setTournament(prev => ({ ...prev, description }))}
                    value={tournament.description}
                    autoCapitalize="none"
                    multiline
                />
            </View>
            <View className="my-1">
                <Text className="mb-1 text-base font-medium text-gray-800">Fee</Text>
                <TextInput
                    className="h-11 px-3 border border-gray-300 rounded-md"
                    placeholder="Fee"
                    onChangeText={(text) => {
                        const numericFee = Number(text.replace(/[^0-9.]/g, ''));
                        setTournament(prev => ({ ...prev, fee: isNaN(numericFee) ? 0 : numericFee }));
                    }}
                    value={tournament.fee.toString()}
                    keyboardType="numeric"
                    inputMode='numeric'
                />
                {errors.includes('fee.invalid') && (<Text className="text-xs text-red-600 mt-1">Fee must be 0 or greater</Text>)}
            </View>
            <View className="my-1">
                <TouchableOpacity className='h-11 bg-blue-600 rounded-md items-center justify-center' onPress={() => saveTournament(tournament)}>
                    <Text className="text-white font-semibold">Save Torunament</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
