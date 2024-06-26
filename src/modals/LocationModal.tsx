import { View, Text, Modal, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ButtonComponent, InputComponent, RowComponent, SpaceComponent, TextComponent } from '../components';
import { SearchNormal1 } from 'iconsax-react-native';
import { appColors } from '../constants/appColors';
import { LocationModel } from '../models/LocationModel';
import axios from 'axios';

interface Props {
    visible: boolean;
    onClose: () => void;
    onSelect: (val: string) => void;
  }

const LocationModal = (props: Props) => {
    const {visible, onClose, onSelect} = props;
    const [searchKey, setSearchKey] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [locations, setLocations] = useState<LocationModel[]>([]);

    useEffect(() => {
      if (!searchKey) {
        setLocations([]);
      }
    }, [searchKey]);

    const handleClose = () => {
      onClose();
    };

    const handleSearchLocation = async () => {
      const api = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${searchKey}&limit=10&apiKey=${process.env.HERE_API_KEY}`;

      try {
        setIsLoading(true);
        const res = await axios.get(api);

        if (res && res.data && res.status === 200) {
          setLocations(res.data.items);
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <Modal animationType="slide" visible={visible} style={{flex: 1}}>
        <View style={{paddingVertical: 42, paddingHorizontal: 20}}>
          <RowComponent justify="flex-end" styles={{marginVertical: 20}}>
            <View style={{flex: 1}}>
              <InputComponent
                styles={{marginBottom: 0}}
                affix={<SearchNormal1 size={20} color={appColors.gray} />}
                placeholder="Search"
                value={searchKey}
                allowClear
                onChange={val => setSearchKey(val)}
                onEnd={handleSearchLocation}
              />
            </View>
            <SpaceComponent width={12} />
            <ButtonComponent text="Cancel" type="link" onPress={handleClose} />
          </RowComponent>

          <View>
            {isLoading ? (
              <ActivityIndicator />
            ) : locations.length > 0 ? (
              <FlatList
                data={locations}
                renderItem={({item}) => (
                  <>
                    <TextComponent text={item.address.label} />
                  </>
                )}
              />
            ) : (
              <View>
                <TextComponent
                  text={searchKey ? 'Location not found' : 'Search location'}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
}

export default LocationModal
