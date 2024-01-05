import {StyleSheet, Text, View, ScrollView} from 'react-native';
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

export default function HomeScreen() {
  const [modalCust, setModalCust] = useState(false);
  const [sheet, setSheet] = useState(false);

  const showToast = useToast();
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
      {/* <BottomSheet show={sheet} hide={() => setSheet(false)}>
        <View style={{height: 400}}>
          <Text>Sheet</Text>
        </View>
      </BottomSheet> */}
      <ScrollView>
        <View>
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
          <OTP pin="" />
          <Spacing />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
