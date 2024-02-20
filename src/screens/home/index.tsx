import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import React, {useState} from 'react';
import {useToast} from '../../hooks/useToast';
import Button from '../../components/button/Button';
import Radio from '../../components/button/Radio';
import RadioInCircle from '../../components/button/RadioInCircle';
import Spacing from '../../components/spacing/Spacing';
import Wrapper from '../../components/button/Wrapper';
import WrapperWithoutFeedback from '../../components/button/WrapperWithoutFeedback';
import {Calender} from '../../components/calender';
import {ProgressBar} from '../../components/progress';
import {commonStyles} from '../../utility/commonStyles';
import {DownArrow, UpArrow} from '../../components/arrow';
import {Drawer} from '../../components/drawer';
import {SCREEN_WIDTH} from '../../utility/constants';
import {BottomSheet} from '../../components/bottomsheet';
import Switch from '../../components/input/Switch';
import OTP from '../../components/input/OTP';
import {HorizontalLine} from '../../components/line';
import Modal from '../../components/modal/modal';
import {pickImageFromGallery} from '../../utility/helper';
import Clock from '../../components/clock/clock.main';

export default function HomeScreen() {
  const [modalCust, setModalCust] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [editImageModal, setEditImageModal] = useState(false);
  const [image, setImage] = useState('');

  const showToast = useToast();

  const handleImagePicker = async () => {
    try {
      const rImage = await pickImageFromGallery({});
      setImage(rImage.assets![0]!.uri!);
      setEditImageModal(true);
    } catch (error) {
      console.log('Error image', error);
    }
  };

  return (
    <View style={[commonStyles.flexOne]}>
      <Drawer
        drawerWidth={SCREEN_WIDTH / 2}
        show={modalCust}
        hide={() => setModalCust(false)}>
        <View>
          <Text>Dearwwerr</Text>
        </View>
      </Drawer>
      <BottomSheet show={sheet} hide={() => setSheet(false)}>
        <View style={{height: 300}}>
          <Text>Sheet</Text>
        </View>
      </BottomSheet>
      <Modal
        containerStyle={{justifyContent: 'center'}}
        show={editImageModal}
        hide={() => setEditImageModal(false)}>
        <View style={[]}>
          <Image
            source={{uri: image}}
            style={{width: SCREEN_WIDTH, height: SCREEN_WIDTH}}
          />
        </View>
      </Modal>
      {/* <BottomSheet show={sheet} hide={() => setSheet(false)}>
        <View style={{height: 400}}>
          <Text>Sheet</Text>
        </View>
      </BottomSheet> */}
      <ScrollView>
        <View>
          <View>
            <Clock />
          </View>
          <View>
            <UpArrow />
            <DownArrow />
          </View>
          <Spacing />
          <Button
            text="Show Toast"
            textStyle={{color: '#000'}}
            onPress={() => showToast('Toast...!!!', 'danger', 3000)}></Button>
          <Button
            text="Show Modal"
            textStyle={{color: '#000'}}
            onPress={() => setModalCust(true)}></Button>

          <Button
            text="Show Sheet"
            textStyle={{color: '#000'}}
            onPress={() => setSheet(true)}></Button>
          <Button
            text="Show Edit Image"
            textStyle={{color: '#000'}}
            onPress={handleImagePicker}></Button>
          <Radio onPress={() => {}} selected />
          <Spacing />
          <RadioInCircle selected onPress={() => {}} />
          <Spacing />
          <Wrapper onPress={() => {}}>
            <Text>Wrapper Components</Text>
          </Wrapper>
          <Spacing />
          <WrapperWithoutFeedback onPress={() => {}}>
            <Text>Wrapper With Feedback</Text>
          </WrapperWithoutFeedback>
          <Spacing />
          <Calender />
          <Spacing />
          <View style={[commonStyles.pH10]}>
            <ProgressBar width="50" />
          </View>
          <Spacing />
          <Switch />
          <Spacing />
          <HorizontalLine />
          <Spacing />
          <OTP pin="" setPin={() => {}} />
          <Spacing />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
